import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import NoobProHacker from '@/models/noobProHacker';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         await connectMongo();

         await NoobProHacker.findHackerInfo().then(noobProHacker => {
            res.status(200).json(noobProHacker);
         });
      } catch {
         res.status(400).json({ error: 'fetch error' });
      }
   } else if (req.method === 'POST') {
     
   }
}
