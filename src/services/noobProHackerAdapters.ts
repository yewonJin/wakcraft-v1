import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { addNoobProHacker, editNoobProHacker, getNoobProHackerById, getNoobProHackerWithoutLine } from './api/noobProHacker';
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

export const useMutationEditNoobProHacker = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: NoobProHacker) =>
      toast.promise(editNoobProHacker(body), {
         loading: '수정중',
         success: '수정 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryNoobProHacker = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<NoobProHacker> = useQuery(
      ['getNoobProHackerByQueryId', id],
      () => getNoobProHackerById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryNoobProHackerById = (id: string) => {
   const { data, refetch }: UseQueryResult<NoobProHacker> = useQuery(
      ['getNoobProHackerById', id],
      () => getNoobProHackerById(id),
      {
         refetchOnWindowFocus: false,
         enabled: false,
      },
   );

   return { data, refetch };
};

export const useQueryNoobProHackerWithoutLine = () => {
   const { data: result }: UseQueryResult<NoobProHacker[]> = useQuery(
      ['getNoobProHackerWithoutLine'],
      () => getNoobProHackerWithoutLine(),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
