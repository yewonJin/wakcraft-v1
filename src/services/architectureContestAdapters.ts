import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { ArchitectureContest } from '@/domain/architectureContest';
import { Architect } from '@/domain/architect';
import {
   addArchitectureContest,
   editArchitectureContest,
   getArchitectureContestByEpisode,
   getArchitectureContestWithoutLine,
} from './api/architectureContest';

export const useMutationArchitectureContest = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: ArchitectureContest) =>
      toast.promise(addArchitectureContest(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useMutationEditArchitectureContest = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: ArchitectureContest) =>
      toast.promise(editArchitectureContest(body), {
         loading: '수정중',
         success: '수정 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryArchitectureContest = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<ArchitectureContest> = useQuery(
      ['getArchitectureContest'],
      () => getArchitectureContestByEpisode(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryArchitectureContestWithoutLine = () => {
   const { data: result }: UseQueryResult<ArchitectureContest[]> = useQuery(
      ['getArchitectureContestWithoutLine'],
      () => getArchitectureContestWithoutLine(),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryArchitectureContestByEpisode = (episode: number) => {
   const { data, refetch }: UseQueryResult<ArchitectureContest> = useQuery(
      ['getArchitectureContestByEpisode'],
      () => getArchitectureContestByEpisode(episode.toString()),
      {
         refetchOnWindowFocus: false,
         enabled: false,
      },
   );

   return { data, refetch };
};

/** 이벤트 눕프핵 정보를 건축가 정보로 변환하는 함수 */
type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'architectureContest'>;
};

export const convertToArchitect = (req: { body: ArchitectureContest }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach((line, index) => {
      line.line_details.forEach(item => {
         const portfolioInfo: Architect['portfolio']['architectureContest'][0] = {
            contentName: '치즐 건콘 - ' + contentInfo.subject,
            episode: contentInfo.episode,
            subject: item.bottomText,
            line: line.line,
            image_url: item.image_url,
            youtube_url: item.youtube_url,
            ranking: item.ranking,
            date: new Date(contentInfo.date),
         };

         architectsInfo.push({
            minecraft_id: item.minecraft_id,
            portfolio: {
               architectureContest: [portfolioInfo],
            },
         });
      });
   });

   return architectsInfo;
};
