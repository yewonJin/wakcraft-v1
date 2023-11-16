import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { addGuessTime, getGuessTimeById } from './api/guessTime';
import { GuessTime } from '@/domain/guessTime';

export const useMutationGuessTime = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: GuessTime) =>
      toast.promise(addGuessTime(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryGuessTime = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<GuessTime> = useQuery(
      ['guessTimeById', id],
      () => getGuessTimeById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
