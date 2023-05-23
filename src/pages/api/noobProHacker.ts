import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';
import NoobProHacker from '@/models/noobProHacker';
import { convertToArchitect } from '@/services/noobProHackerAdapters';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { episode } = req.query;

      try {
         await connectMongo();

         await NoobProHacker.findByEpisode(episode as string).then(noobProHacker => {
            res.status(200).json(noobProHacker);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      const architectsInfo = convertToArchitect(req);

      await connectMongo();

      await NoobProHacker.create(req.body);

      try {

         res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   }
}

/*
   architectsInfo.forEach(async item => {
      await Architect.findOneAndPushToPortfolio(item.minecraft_id, item.portfolio.noobProHacker[0]);
   });
*/
