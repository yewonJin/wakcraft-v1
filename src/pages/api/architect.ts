import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';
import NoobProHacker from '@/models/noobProHacker';
import PlacementTest from '@/models/placementTest';
import EventNoobProHacker from '@/models/eventNoobProHacker';

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

      try {
         await connectMongo();

         if (originalId !== minecraft_id) {
            ['noob', 'pro', 'hacker'].forEach(async tier => {
               await NoobProHacker.updateArchitectId(originalId as string, minecraft_id as string, tier as string);
            });

            await PlacementTest.updateArchitectId(originalId as string, minecraft_id as string);

            await EventNoobProHacker.updateArchitectId(originalId as string, minecraft_id as string);
         }

         await Architect.findOneByMinecraftIdAndUpdate(originalId, minecraft_id, wakzoo_id, tier)
            .then(architect => res.json(architect))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   }
}
