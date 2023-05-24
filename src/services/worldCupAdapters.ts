import { UseQueryResult, useQuery } from 'react-query';

import { getWorldCup } from './api/worldCup';
import { NoobProHacker } from '@/domain/noobProHacker';

export const useQueryWorldCup = () => {
   const { data: result }: UseQueryResult<NoobProHacker[]> = useQuery(['getWorldCup'], () => getWorldCup(), {
      refetchOnWindowFocus: false,
   });

   return result;
};

export type WorldCupItem = {
   episode: number;
   subject: string;
   minecraft_id: string;
   image_url: string;
   youtube_url: string;
};

export const convertToWorldCupArray = (arr: NoobProHacker[]) => {
   const worldCupArray: WorldCupItem[] = [];

   arr.forEach(item => {
      item.lineInfo.forEach(item2 => {
         const worldCupItem = {
            episode: item.contentInfo.episode,
            subject: item2.subject,
            minecraft_id: item2.line_details.hacker.minecraft_id,
            image_url: item2.line_details.hacker.image_url,
            youtube_url: item2.line_details.hacker.youtube_url,
         };

         worldCupArray.push(worldCupItem);
      });
   });

   return worldCupArray;
};
