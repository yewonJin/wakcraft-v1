import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

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
            return res.status(401).json('등록된 아이디 정보가 없습니다.');
         }

         const valid = await admin.checkPassword(password);

         if (!valid) {
            return res.status(401).json('비밀번호가 맞지 않습니다');
         }

         const token = await admin.generateToken();

         setCookie('access_token', token, { req, res, path: '/' });

         res.status(200).json({ username: admin.username });
      } catch (e) {
         res.send(e);
      }
   }
}
