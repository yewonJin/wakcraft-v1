import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import NoobProHacker from '@/models/noobProHacker';
import { Game, convertToWorldcup } from '@/domain/worldcup';
import Worldcup from '@/models/worldcup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         await connectMongo();

         await Worldcup.findAllByGameName('HackerWorldCup' as Game).then(worldcup => {
            res.status(200).json(worldcup);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
      try {
         await connectMongo();

         const noobProHackers = await NoobProHacker.findHackerInfo();

         convertToWorldcup(noobProHackers).forEach(async item => {
            await Worldcup.create(item);
         });

         res.status(200).json('성공');
      } catch {
         res.status(400).json({ error: 'POST Error' });
      }
   } else if (req.method === 'PATCH') {
      if (req.query.reset) {
         try {
            await connectMongo();

            await Worldcup.resetNumberOfParticipation();

            await Worldcup.resetNumberOfWin();

            res.status(200).json('리셋 성공');
         } catch {
            res.status(400).json({ error: 'PUT Error' });
         }
      } else {
         try {
            await connectMongo();

            await Worldcup.increaseNumberOfWin(req.body as string);

            const worldcups = await Worldcup.findAllByGameName('HackerWorldCup');

            worldcups
               .sort((a, b) => b.workInfo.episode - a.workInfo.episode)
               .slice(0, 128)
               .forEach(async item => {
                  await Worldcup.increaseNumberOfParticipation(item.workInfo.subject);
               });

            res.status(200).json('성공');
         } catch {
            res.status(400).json({ error: 'PATCH Error' });
         }
      }
   } else if (req.method === 'PUT') {
   }
}
