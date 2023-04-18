import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      try {
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
         const { minecraft_id } = req.body

         await connectMongo();

         await Architect.findOneByMinecraftIdAndUpdate(minecraft_id, req.body)
            .then(architect => res.json(architect))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   }
}
