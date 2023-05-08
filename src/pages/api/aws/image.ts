import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

import { listObjectsBucketParams, s3, uploadFile } from '@/utils/aws';

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
      const { content, episode } = req.query;

      if (!content || !episode) return res.status(400).send({ error: '에러' });

      try {
         const data = await s3.send(
            new ListObjectsCommand(
               listObjectsBucketParams(content as 'noobProHacker' | 'placementTest', req.query.episode as string),
            ),
         );

         if (!data.Contents) return res.status(400).send({ error: '해당 object가 없습니다.' });

         return res
            .status(200)
            .send(data.Contents.filter(item => item.Key?.split('/')[2] !== '').map(item => item.Key));
      } catch (e) {
         console.log(e);
      }
   } else if (req.method === 'POST') {
      try {
         const fileData = await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();

            // formidable로 폼 파싱
            form.parse(req, (err, fields, files) => {
               if (err) return reject(err);
               return resolve({ fields, files });
            });
         });

         const parsedFileData = fileData as parsedFileData;

         Object.values(parsedFileData.files).forEach(async item => {
            // fs.createReadStream이용해 스트림 전환 후 올리기
            const fileBuffer = fs.createReadStream(item.filepath);
            fileBuffer.on('error', err => console.log(err));

            const fileName =
               `${parsedFileData.fields.content}/${
                  parsedFileData.fields.content === 'noobProHacker' ? 'episode' : 'season'
               } ${parsedFileData.fields.episode}/` + item.originalFilename;

            await uploadFile(fileBuffer, fileName, item.mimetype);
         });

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
