import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import PlacementTest from '@/models/placementTest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      // 테스트

      const { season } = req.body;
      
      await connectMongo();

      await PlacementTest.create(req.body);

      try {
         req.body.participants.forEach(async item => {
            await Architect.findOneAndPushToPlacementTest(item.minecraft_id, {
               season: season,
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
