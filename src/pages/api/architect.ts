import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      try {
         Architect.create(req.body)
            .then(todo => res.send(todo))
            .catch(err => res.status(500).send(err));
      } catch (e) {
         console.log(e);
      }
   } else if (req.method === 'GET') {
      try {
         console.log('CONNECTING TO MONGO');
         await connectMongo();

         if (req.query.tier) {
            Architect.findAllByLineTier(req.query.tier as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.search) {
            Architect.findAllByInput(req.query.search as string)
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else if (req.query.portfolio == 'false') {
            Architect.findAllWithoutPortfolio()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         } else {
            Architect.findAll()
               .then(architects => {
                  if (!architects.length) return res.status(404).send({ err: 'architects not found' });
                  res.json(architects);
               })
               .catch(err => res.status(500).send(err));
         }
      } catch (error) {
         console.log(error);
      }
   }
}

/*

*/
