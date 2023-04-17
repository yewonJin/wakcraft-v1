import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import Admin from '@/models/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { username, password } = req.body;

      if (!username || !password) {
         res.status(401); // Unauthorized
         return;
      }

      try {
         await connectMongo();

         const admin = await Admin.findByUsername(username);

         if (!admin) {
            res.status(401);
            res.json('해당 아이디가 없습니다.');

            return;
         }

         const valid = await admin.checkPassword(password);
         if (!valid) {
            res.status(401);
            res.json('비밀번호가 맞지 않습니다');

            return;
         }

         res.json('로그인 성공');
      } catch (e) {
         res.send(e);
      }
   }
}
