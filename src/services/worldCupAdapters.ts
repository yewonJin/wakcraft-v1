import { UseQueryResult, useMutation, useQuery } from 'react-query';

import { getWorldCup, increaseWinnerCount } from './api/worldcup';
import { Worldcup } from '@/domain/worldcup';

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
