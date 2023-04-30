// s3 접근하기 위해 불러옴
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

// .env에서 aws 정보 읽어오기
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
export const listObjectsBucketParams = (episode?: string) => {
   if (!episode) {
      return {
         Bucket: awsS3Bucket,
         Prefix: `noobProHacker/`,
      };
   } else {
      return {
         Bucket: awsS3Bucket,
         Prefix: `noobProHacker/episode ${episode}/`,
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

export async function createFolder(fileName: string) {
   const params = {
      Bucket: awsS3Bucket,
      Key: 'noobProHacker/episode ' + fileName + '/',
      Body: '',
   };

   const res = await s3.send(new PutObjectCommand(params));
   return res.$metadata.httpStatusCode;
}
