import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import PlacementTest from '@/models/placementTest';
import { Tier } from '@/domain/architect';

type PlacementTestType = {
   season: number;
   date: string;
   youtube_url: string;
   participants: {
      minecraft_id: string;
      image_url: string;
      cafe_url: string;
      placement_result: Tier;
   }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { body }: { body: PlacementTestType } = req;

      await connectMongo();

      try {
         await PlacementTest.create(body);

         return res.status(200).json('DB에 추가 했습니다.');
      } catch (e) {
         res.status(400).json({ error: 'DB에 추가 하지 못했습니다.' });
      }
   }
}
