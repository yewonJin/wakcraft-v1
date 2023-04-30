import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

import { createFolder, listObjectsBucketParams, s3, uploadFile } from '@/utils/aws';

type Img = {
   size: string;
   filepath: string;
   newFilename: string;
   mimetype: string;
   mtime: Date;
   originalFilename: string;
};

type Files = {
   [file: string]: Img;
};

type parsedFileData = {
   fields: formidable.Fields;
   files: Files;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         const data = await s3.send(new ListObjectsCommand(listObjectsBucketParams()));

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
         const { episode } = req.query;

         if (!episode) {
            return res.status(400).send({ error: '에러' });
         }
         await createFolder(episode as string);

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
      sizeLimit: '4mb', // 업로드 이미지 용량 제한
   },
};
