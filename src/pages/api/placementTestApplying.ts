import connectMongo from '@/utils/connectMongo';

import { NextApiRequest, NextApiResponse } from 'next';

import PlacementTestApplying from '@/models/placementTestApplying';
import { PlacementTestApplyingPayload } from '@/application/createTempPlacementTest';
import Architect from '@/models/architect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         await connectMongo();

         const results = await PlacementTestApplying.findAll();

         return res.status(200).json(results);
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      // 테스트
      const { body }: { body: PlacementTestApplyingPayload[] } = req;

      await connectMongo();

      try {
         body.forEach(async (item, index) => {
            const architect = await Architect.findOneByMinecraftId(item.minecraft_id);

            const a = JSON.parse(JSON.stringify(architect));

            await PlacementTestApplying.create({ cafe_url: item.cafe_url, ...a, order: index });
         });

         return res.status(200).json('DB 추가 성공');
      } catch (e) {
         res.status(400).json({ error: 'DB 추가 실패' });
      }
   }
}
