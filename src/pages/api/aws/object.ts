import { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

import { createFolder, listObjectsBucketParams, s3 } from '@/utils/aws';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      const { content } = req.query;

      if (!content) return res.status(400).send({ error: 'query string이 없습니다' });

      try {
         const data = await s3.send(
            new ListObjectsCommand(listObjectsBucketParams(content as 'noobProHacker' | 'placementTest')),
         );

         if (!data.Contents) return res.status(400).send({ error: '해당 object가 없습니다.' });

         return res
            .status(200)
            .json(
               data.Contents.filter(item => item.Key?.split('/')[2] === '').map(
                  item => item.Key?.split('/')[1].split(' ')[1],
               ),
            );
      } catch (e) {
         console.log(e);
      }
   } else if (req.method === 'POST') {
      try {
         const { content, episode } = req.query;

         if (!episode || !content) {
            return res.status(400).send({ error: '에러' });
         }

         await createFolder(content as 'noobProHacker' | 'placementTest', episode as string);

         return res.status(201).json({
            message: 's3 uploading with fs succeeded',
         });
      } catch (err) {
         return res.status(500).json({ message: 's3 uploading with fs has failed' });
      }
   }
}

export const config = {
   api: {
      bodyParser: false,
   },
};
