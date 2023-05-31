import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import EventNoobProHacker from '@/models/eventNoobProHacker';
import { convertToArchitect } from '@/services/eventNoobProHackerAdapters';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { episode } = req.query;

      try {
         await connectMongo();

         await EventNoobProHacker.findByEpisode(episode as string).then(eventNoobProHacker => {
            res.status(200).json(eventNoobProHacker);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      const architectsInfo = convertToArchitect(req);      

      await connectMongo();

      await EventNoobProHacker.create(req.body);

      try {
         architectsInfo.forEach(async item => {
            await Architect.findOneAndPushToEventNoobProHacker(item.minecraft_id, item.portfolio.eventNoobProHacker[0]);
         });
         res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   }
}
