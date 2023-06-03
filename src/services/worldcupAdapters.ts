import { UseQueryResult, useMutation, useQuery } from 'react-query';

import { Worldcup } from '@/domain/worldcup';
import { toast } from 'react-hot-toast';
import { getWorldCup, increaseWinnerCount, resetCount } from './api/worldcup';

export const useQueryWorldCup = () => {
   const { data: result }: UseQueryResult<Worldcup[]> = useQuery(['getWorldCup'], () => getWorldCup(), {
      refetchOnWindowFocus: false,
   });

   return result;
};

export const useMutationWorldcup = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: Worldcup) => increaseWinnerCount(body.workInfo.subject));

   return mutation;
};

export const useMutationResetWorldcup = () => {
   const { mutate } = useMutation(() =>
      toast.promise(resetCount(), {
         loading: '리셋 중',
         success: '리셋 완료',
         error: err => err.message,
      }),
   );

   return { mutate };
};
