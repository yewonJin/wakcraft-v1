import { NextApiRequest, NextApiResponse } from 'next';
import { CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

import { copyObjectBucketParams, deleteObjectParams, headObjectParams, s3 } from '@/utils/aws';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'PATCH') {
      const { beforeId, afterId } = req.query;

      if (!beforeId || !afterId) res.status(400).send({ error: 'undefined query' });

      const fileExtension = ['png', '1080p.webp', 'webp'];
      const season = [1, 2, 3];

      for (let i = 0; i < season.length; i++) {
         for (let j = 0; j < fileExtension.length; j++) {
            try {
               await s3.send(new HeadObjectCommand(headObjectParams(beforeId as string, season[i], fileExtension[j])));
            } catch {
               continue;
            }

            await s3.send(
               new CopyObjectCommand(
                  copyObjectBucketParams(beforeId as string, afterId as string, season[i], fileExtension[j]),
               ),
            );

            await s3.send(new DeleteObjectCommand(deleteObjectParams(beforeId as string, season[i], fileExtension[j])));
         }
      }

      return res.status(200).send('이름 변경 성공');
   }
}

export const config = {
   api: {
      bodyParser: false,
   },
};
