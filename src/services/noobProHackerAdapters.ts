import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { addNoobProHacker, getAllWinLine, getNoobProHackerById, getRecentWinLine } from './api/noobProHacker';
import { NoobProHacker } from '@/domain/noobProHacker';

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

export const useQueryNoobProHackerSweepLine = () => {
   const { data: result }: UseQueryResult<NoobProHacker[]> = useQuery('getAllWinLine', () => getAllWinLine(), {
      refetchOnWindowFocus: false,
   });

   return result;
};

export const useQueryNoobProHackerRecentWinLine = () => {
   const { data: result }: UseQueryResult<NoobProHacker[]> = useQuery('getRecentWinLine', () => getRecentWinLine(), {
      refetchOnWindowFocus: false,
   });

   return result;
};