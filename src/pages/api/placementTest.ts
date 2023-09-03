import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import PlacementTest from '@/models/placementTest';
import { NextApiRequest, NextApiResponse } from 'next';
import { Tier } from '@/domain/architect';
import { convertToArchitect } from '@/domain/placementTest';

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

      // 모든 건축가 배치고사 티어 언랭으로 설정
      await Architect.findAllAndSetTierUnRanked();

      // 모든 건축가 현재 티어 언랭으로 설정
      await Architect.findAllAndSetCurTierUnRanked();

      // 배치고사 참여한 건축가는 배치 티어로 티어 설정하기
      try {
         body.participants.forEach(async item => {
            await Architect.findOneAndUnSetTierFirstIndex(item.minecraft_id);

            await Architect.findOneAndPullTierNull(item.minecraft_id);

            await Architect.findOneByMinecraftIdAndUpdateCurTier(item.minecraft_id, item.placement_result);

            await Architect.findOneAndPushToPlacementTest(item.minecraft_id, {
               season: body.season,
               image_url: item.image_url,
               placement_result: item.placement_result,
               date: new Date(body.date),
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
            await Architect.findOneByMinecraftIdAndUpdatePlacementTest(
               item.minecraft_id,
               item.portfolio.placementTest[0].season,
               item.portfolio.placementTest[0].date,
            );
         });
         res.status(200).json('DB 수정 완료');
      } catch (e) {
         res.status(400).json({ error: 'DB 수정 실패' });
      }
   }
}
