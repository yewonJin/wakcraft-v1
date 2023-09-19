import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';
import NoobProHacker from '@/models/noobProHacker';
import PlacementTest from '@/models/placementTest';
import EventNoobProHacker from '@/models/eventNoobProHacker';
import ArchitectureContest from '@/models/architectureContest';
import MatchYourTier from '@/models/matchYourTier';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { minecraft_id, wakzoo_id } = req.body;

      await connectMongo();

      try {
         if (await Architect.exists({ minecraft_id: minecraft_id })) {
            return res.status(401).send({ error: '이미 존재하는 마크 아이디 입니다.' });
         }

         if (await Architect.exists({ wakzoo_id: wakzoo_id })) {
            return res.status(401).send({ error: '이미 존재하는 왁물원 아이디 입니다.' });
         }

         await Architect.create(req.body)
            .then(architect => res.send(architect))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   } else if (req.method === 'GET') {
      try {
         await connectMongo();

         if (req.query.tier) {
            await Architect.findAllByLineTier(req.query.tier as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.id) {
            await Architect.findOneByMinecraftId(req.query.id as string)
               .then(architects => {
                  if (!architects) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.search) {
            await Architect.findAllByInput(req.query.search as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.portfolio == 'false') {
            await Architect.findAllWithoutPortfolio()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else {
            await Architect.findAll()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         }
      } catch (error) {
         console.log(error);
      }
   } else if (req.method === 'PATCH') {
      const { originalId, minecraft_id, wakzoo_id, tier } = req.body;

      await connectMongo();

      if (originalId !== minecraft_id) {
         // 눕프로해커에서 마인크래프트 아이디 바꾸기
         try {
            ['noob', 'pro', 'hacker'].forEach(async tier => {
               await NoobProHacker.updateArchitectId(originalId as string, minecraft_id as string, tier as string);
            });
         } catch (e) {
            return res.status(400).send({ error: e });
         }

         // 배치고사에서 마인크래프트 아이디 바꾸기
         try {
            const placementTests = await PlacementTest.findByArchitectId(originalId);

            placementTests.forEach(async placementTest => {
               await PlacementTest.updateArchitectId(
                  placementTest.season,
                  originalId as string,
                  minecraft_id as string,
               );
            });
         } catch (e) {
            return res.status(400).send({ error: e });
         }

         // 이벤트 눕프핵에서 마인크래프트 아이디 바꾸기
         try {
            await EventNoobProHacker.updateArchitectId(originalId as string, minecraft_id as string);
         } catch (e) {
            return res.status(400).send({ error: e });
         }

         // 건축 콘테스트에서 마인크래프트 아이디 바꾸기
         try {
            await ArchitectureContest.updateArchitectId(originalId as string, minecraft_id as string);
         } catch (e) {
            return res.status(400).send({ error: '건축 콘테스트 변경 오류' });
         }

         try {
            // 티어 맞추기에서 마인크래프트 아이디 바꾸기
            await MatchYourTier.updateArchitectId(originalId as string, minecraft_id as string);
         } catch (e) {
            return res.status(400).send({ error: e });
         }
      }

      try {
         await Architect.findOneByMinecraftIdAndUpdate(originalId as string, minecraft_id as string, wakzoo_id, tier);
      } catch (e) {
         return res.status(400).send({ error: e });
      }

      return res.status(200).send('변경 성공');
   }
}
