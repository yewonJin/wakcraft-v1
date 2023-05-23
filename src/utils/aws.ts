import { S3Client, PutObjectCommand, _Object } from '@aws-sdk/client-s3';
import fs from 'fs';

const awsAccessKey = process.env.MY_AWS_ACCESS_KEY as string;
const awsSecretKey = process.env.MY_AWS_SECRET_KEY as string;
const awsS3Bucket = process.env.MY_AWS_S3_BUCKET as string;
const awsS3BucketRegion = process.env.MY_AWS_S3_BUCKET_REGION as string;

// s3 클라이언트 연결
export const s3 = new S3Client({
   credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey,
   },
   region: awsS3BucketRegion,
});

/** 입력받은 눕프핵 에피소드를 반환하는 옵션  */
export const listObjectsBucketParams = (
   content: 'noobProHacker' | 'placementTest' | 'eventNoobProHacker',
   episode?: string,
) => {
   if (!episode) {
      return {
         Bucket: awsS3Bucket,
         Prefix: `${content}/`,
         Delimiter: '/',
      };
   } else {
      return {
         Bucket: awsS3Bucket,
         Prefix: `${content}/${content === 'placementTest' ? 'season' : 'episode'} ${episode}/`,
      };
   }
};

// 파일 업로드
export async function uploadFile(fileBuffer: fs.ReadStream, fileName: string, mimetype: string) {
   const uploadParams = {
      Bucket: awsS3Bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimetype,
   };

   const res = await s3.send(new PutObjectCommand(uploadParams));
   return res.$metadata.httpStatusCode;
}

/** 다음 회차 폴더 만들기 */
export async function createFolder(
   content: 'noobProHacker' | 'placementTest' | 'eventNoobProHacker',
   fileName: string,
) {
   const params = {
      Bucket: awsS3Bucket,
      Key: `${content}/${content === 'placementTest' ? 'season' : 'episode'} ` + fileName + '/',
      Body: '',
   };

   const res = await s3.send(new PutObjectCommand(params));
   return res.$metadata.httpStatusCode;
}


export const hideFolder = (arr: _Object[]) => {
   return arr.filter(item => item.Key?.split('/')[2] !== '');
};

export const hideWebp = (arr: _Object[]) => {
   return arr.filter(item => item.Key?.split('.')[1] !== 'webp');
};

