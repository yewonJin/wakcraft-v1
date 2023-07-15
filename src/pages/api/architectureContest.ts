import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import ArchitectureContest from '@/models/architectureContest';
import { convertToArchitect } from '@/services/architectureContestAdapters';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      if (req.query.episode) {
         const { episode } = req.query;

         try {
            await connectMongo();

            await ArchitectureContest.findByEpisode(episode as string).then(architectureContest => {
               res.status(200).json(architectureContest);
            });
         } catch {
            res.status(400).json({ error: 'fetch error' });
         }
      } else {
         try {
            await connectMongo();

            await ArchitectureContest.findAllWithoutLineInfo().then(data => {
               res.status(200).json(data);
            });
         } catch {
            res.status(400).json({ error: 'fetch error' });
         }
      }
   } else if (req.method === 'POST') {
      const architectsInfo = convertToArchitect(req);

      await connectMongo();

      await ArchitectureContest.create(req.body);

      try {
         architectsInfo.forEach(async item => {
            await Architect.findOneAndPushToArchitectureContest(
               item.minecraft_id,
               item.portfolio.architectureContest[0],
            );
         });
         res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   } else if (req.method === 'PUT') {
      const architectsInfo = convertToArchitect(req);

      await connectMongo();

      await ArchitectureContest.findOneByEpisodeAndUpdate(req.body);

      try {
         architectsInfo.forEach(async item => {
            await Architect.findOneByMinecraftIdAndUpdateArchitectureContest(
               item.minecraft_id,
               item.portfolio.architectureContest[0].episode,
               item.portfolio.architectureContest[0].youtube_url,
               item.portfolio.architectureContest[0].date,
            );
         });
         res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   }
}
