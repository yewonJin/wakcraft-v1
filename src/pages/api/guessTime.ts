import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArchitect } from '@/domain/matchYourTier';
import GuessTime from '@/models/guessTime';

type GuessTimeType = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   participants: {
      order: number;
      expectedTime: 2 | 4 | 6 | 8 | 10;
      time: 2 | 4 | 6 | 8 | 10;
      minecraft_id: string;
      image_url: string;
      youtube_url: string;
   }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { episode } = req.query;

      try {
         await connectMongo();

         await GuessTime.findByEpisode(episode as string).then(guessTime => {
            res.status(200).json(guessTime);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      const { body }: { body: GuessTimeType } = req;

      const architectsInfo = convertToArchitect(req);

      await connectMongo();

      await GuessTime.create(body);

      try {
         architectsInfo.forEach(async item => {
            await Architect.findOneAndPushToEventNoobProHacker(item.minecraft_id, item.portfolio.eventNoobProHacker[0]);
         });

         return res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   } else if (req.method === 'PATCH') {
      const architectsInfo = convertToArchitect(req);

      await connectMongo();

      try {
         architectsInfo.forEach(async item => {
            await Architect.findOneByMinecraftIdAndUpdateEventNoobProHacker(
               item.minecraft_id,
               item.portfolio.eventNoobProHacker[0].episode,
               item.portfolio.eventNoobProHacker[0].youtube_url,
               item.portfolio.eventNoobProHacker[0].date,
            );
         });
         res.status(200).json('DB 수정 완료');
      } catch (e) {
         res.status(400).json({ error: 'DB 수정 실패' });
      }
   }
}
