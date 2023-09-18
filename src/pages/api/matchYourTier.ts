import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import MatchYourTier from '@/models/matchYourTier';
import { NextApiRequest, NextApiResponse } from 'next';
import { Tier } from '@/domain/architect';
import { convertToArchitect } from '@/domain/matchYourTier';

type MatchYourTierType = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   participants: {
      expectedTier: Tier;
      currentTier: Tier;
      subject: string;
      minecraft_id: string;
      image_url: string;
      youtube_url: string;
      ranking: number;
   }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { episode } = req.query;

      try {
         await connectMongo();

         await MatchYourTier.findByEpisode(episode as string).then(matchYourTier => {
            res.status(200).json(matchYourTier);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      const { body }: { body: MatchYourTierType } = req;

      await connectMongo();

      await MatchYourTier.create(body);

      try {
         body.participants.forEach(async item => {
            await Architect.findOneAndPushToEventNoobProHacker(item.minecraft_id, {
               episode: body.contentInfo.episode,
               image_url: item.image_url,
               subject: `${item.expectedTier} -> ${item.currentTier}`,
               youtube_url: item.youtube_url,
               contentName: body.contentInfo.contentName,
               line: '',
               ranking: item.ranking,
               date: new Date(body.contentInfo.date),
            });
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
