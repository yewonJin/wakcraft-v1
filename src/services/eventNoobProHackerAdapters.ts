import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

import {
   addEventNoobProHacker,
   editEventNoobProHacker,
   getEventNoobProHackerByEpisode,
   getEventNoobProHackerWithoutLine,
} from './api/eventNoobProHacker';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { useRouter } from 'next/router';
import { Architect } from '@/domain/architect';

export const useMutationEventNoobProHacker = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: EventNoobProHacker) =>
      toast.promise(addEventNoobProHacker(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useMutationEditEventNoobProHacker = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: EventNoobProHacker) =>
      toast.promise(editEventNoobProHacker(body), {
         loading: '수정중',
         success: '수정 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryEventNoobProHacker = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<EventNoobProHacker> = useQuery(
      ['getEventNoobProHacker'],
      () => getEventNoobProHackerByEpisode(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryEventNoobProHackerWithoutLine = () => {
   const { data: result }: UseQueryResult<EventNoobProHacker[]> = useQuery(
      ['getEventNoobProHackerWithoutLine'],
      () => getEventNoobProHackerWithoutLine(),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryEventNoobProHackerByEpisode = (episode: number) => {
   const { data, refetch }: UseQueryResult<EventNoobProHacker> = useQuery(
      ['getEventNoobProHackerByEpisode'],
      () => getEventNoobProHackerByEpisode(episode.toString()),
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
   portfolio: Pick<Architect['portfolio'], 'eventNoobProHacker'>;
};

export const convertToArchitect = (req: { body: EventNoobProHacker }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach((line, index) => {
      line.line_details.forEach(item => {
         const portfolioInfo: Architect['portfolio']['eventNoobProHacker'][0] = {
            contentName: contentInfo.contentName,
            episode: contentInfo.episode,
            subject: lineInfo[index].subject,
            line: item.line,
            image_url: item.image_url,
            youtube_url: item.youtube_url,
            ranking: item.ranking,
         };

         item.minecraft_id.forEach(id => {
            architectsInfo.push({
               minecraft_id: id,
               portfolio: {
                  eventNoobProHacker: [portfolioInfo],
               },
            });
         });
      });
   });

   return architectsInfo;
};
