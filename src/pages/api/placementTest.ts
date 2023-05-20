import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import PlacementTest from '@/models/placementTest';
import { NextApiRequest, NextApiResponse } from 'next';
import { Tier } from '@/domain/architect';

type PlacementTestType = {
   season: number;
   date: string;
   youtube_url: string;
   participants: {
      minecraft_id: string;
      image_url: string;
      placement_result: Tier;
   }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { season } = req.query;

      try {
         await connectMongo();

         await PlacementTest.findBySeason(season as string).then(placementTest => {
            res.status(200).json(placementTest);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      // 테스트
      const { body }: { body: PlacementTestType } = req;

      await connectMongo();

      await PlacementTest.create(body);

      await Architect.findAllAndSetTierUnRanked();

      try {
         body.participants.forEach(async item => {
            await Architect.findOneAndUnSetTierFirstIndex(item.minecraft_id);

            await Architect.findOneAndPullTierNull(item.minecraft_id);

            await Architect.findOneAndPushToPlacementTest(item.minecraft_id, {
               season: body.season,
               image_url: item.image_url,
               placement_result: item.placement_result,
            });
         });
         return res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   }
}
