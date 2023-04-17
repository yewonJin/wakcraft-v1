import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/utils/connectMongo';
import Admin from '@/models/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const schema = Joi.object().keys({
         username: Joi.string().alphanum().min(3).max(15).required(),
         password: Joi.string().required(),
         admin_key: Joi.string().required(),
      });

      const result = schema.validate(req.body);

      if (result.error) {
         res.status(500);
         res.send(result.error);
      }

      const { username, password, admin_key } = req.body;

      if (admin_key !== process.env.ADMIN_KEY) {
         res.json('어드민 키가 일치하지 않습니다.');
         return;
      }

      try {
         await connectMongo();

         const exists = await Admin.findByUsername(username);
         if (exists) {
            res.status(500); // Conflict
            return;
         }

         const admin = new Admin({
            username,
         });

         await admin.setPassword(password);
         await admin.save();

         res.json('성공');
      } catch (e) {
         res.send(e);
      }
   }
}
