import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { minecraft_id, wakzoo_id } = req.body;

      await connectMongo();

      try {
         if (await Architect.exists({ minecraft_id: minecraft_id })) {
            return res.status(401).send({ error: '이미 존재하는 마크 아이디 입니다.' });
         }

         if (await Architect.exists({ wakzoo_id: wakzoo_id })) {
            return res.status(401).send({ error: '이미 존재하는 왁물원 아이디 입니다.' });
         }

         await Architect.create(req.body)
            .then(architect => res.send(architect))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   } else if (req.method === 'GET') {
      try {
         await connectMongo();

         if (req.query.tier) {
            await Architect.findAllByLineTier(req.query.tier as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.search) {
            await Architect.findAllByInput(req.query.search as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.portfolio == 'false') {
            await Architect.findAllWithoutPortfolio()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else {
            await Architect.findAll()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         }
      } catch (error) {
         console.log(error);
      }
   } else if (req.method === 'PATCH') {
      try {
         const { originalId, minecraft_id, wakzoo_id, tier } = req.body;

         await connectMongo();

         await Architect.findOneByMinecraftIdAndUpdate(originalId, minecraft_id, wakzoo_id, tier)
            .then(architect => res.json(architect))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   }
}
