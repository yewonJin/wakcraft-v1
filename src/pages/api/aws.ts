import { uploadFile } from '@/utils/aws';
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      try {
         const fileData = await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();

            form.parse(req, (err, fields, files) => {
               if (err) return reject(err);
               return resolve({ fields, files});
            });
         });
         // formidable로 폼 파싱


         // fs.createReadStream이용해 스트림 전환 후 올리기
         const fileBuffer = fs.createReadStream(fileData.files.file.filepath);
         fileBuffer.on('error', err => console.log(err));

         const fileName = `noobProHacker/episode ${fileData.fields.episode}/` + fileData.files.file.originalFilename;

         await uploadFile(fileBuffer, fileName, fileData.files.file.mimetype);

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
