import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { addNoobProHacker, getNoobProHackerById } from './api/noobProHacker';
import { NoobProHacker } from '@/domain/noobProHacker';
import { Architect } from '@/domain/architect';

export const useMutationNoobProHacker = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: NoobProHacker) =>
      toast.promise(addNoobProHacker(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryNoobProHacker = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<NoobProHacker> = useQuery(
      ['noobProHackerById', id],
      () => getNoobProHackerById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

/** 눕프핵 정보를 건축가 정보로 변환하는 함수 */

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'noobProHacker'>;
};

type Line = 'noob' | 'pro' | 'hacker';

export const convertToArchitect = (req: { body: NoobProHacker }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach(line => {
      for (const key in line.line_details) {
         const portfolioInfo: Architect['portfolio']['noobProHacker'][0] = {
            episode: contentInfo.episode,
            subject: line.subject,
            line: key as Line,
            image_url: line.line_details[key as Line].image_url,
            youtube_url: line.line_details[key as Line].youtube_url,
            ranking: line.line_details[key as Line].ranking,
         };

         architectsInfo.push({
            minecraft_id: line.line_details[key as Line].minecraft_id,
            portfolio: {
               noobProHacker: [portfolioInfo],
            },
         });
      }
   });

   return architectsInfo;
};

export const renameToWebp = (imageUrl: string) => {
   const splitName = imageUrl.split('.');

   return `${splitName.slice(0, splitName.length - 1).join('.')}.webp`;
};

export const renameTo1080Webp = (imageUrl: string) => {
   const splitName = imageUrl.split('.')

   return `${splitName.slice(0, splitName.length - 1).join('.')}.1080p.webp`
}
