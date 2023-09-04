import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'PATCH') {
      await connectMongo();

      const architects = await Architect.findAll();

      try {
         architects.forEach(async architect => {
            type Keys =
               | 'noobProHacker'
               | 'placementTest'
               | 'eventNoobProHacker'
               | 'eventNoobProHacker'
               | 'architectureContest';

            const keys = Object.keys(architect.portfolio);

            const numberOfParticipation = keys.reduce((acc, cur) => acc + architect.portfolio[cur as Keys].length, 0);

            const numberOfWin =
               architect.portfolio['noobProHacker'].filter(item => item.ranking === 1).length +
               architect.portfolio['eventNoobProHacker'].filter(item => item.ranking === 1).length +
               architect.portfolio['architectureContest'].filter(item => item.ranking === 1).length;

            const numberOfHackerWin = architect.portfolio['noobProHacker'].filter(
               item => item.ranking === 1 && item.line === 'hacker',
            ).length;
            const numberOfProWin = architect.portfolio['noobProHacker'].filter(
               item => item.ranking === 1 && item.line === 'pro',
            ).length;

            await Architect.updateNumberOfParticipation(architect.minecraft_id, numberOfParticipation);
            await Architect.updateNumberOfWin(architect.minecraft_id, numberOfWin);
            await Architect.updateNumberOfHackerWin(architect.minecraft_id, numberOfHackerWin);
            await Architect.updateNumberOfProWin(architect.minecraft_id, numberOfProWin);
         });

         return res.status(200).send('변경 성공');
      } catch (e) {
         console.log(e);
      }
   }
}
