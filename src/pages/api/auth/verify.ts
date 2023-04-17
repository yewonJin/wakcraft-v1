import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const token = req.headers.cookie?.split('access_token=')[1] as string;

      if (!token) return res.send(false);

      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

         if (decoded) {
            return res.send(true);
         } else {
            return res.send(false);
         }
      } catch (e) {
         console.log(e);
      }
   }
}
