import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { uploadFile } from '@/utils/aws';

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
   if (req.method === 'POST') {
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

         // fs.createReadStream이용해 스트림 전환 후 올리기
         const fileBuffer = fs.createReadStream(parsedFileData.files.file.filepath);
         fileBuffer.on('error', err => console.log(err));

         const fileName =
            `noobProHacker/episode ${parsedFileData.fields.episode}/` + parsedFileData.files.file.originalFilename;

         await uploadFile(fileBuffer, fileName, parsedFileData.files.file.mimetype);

         return res.status(201).json({
            message: 's3 uploading with fs succeeded',
            imgUrl: fileName,
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
