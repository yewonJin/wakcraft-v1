import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

import { addEventNoobProHacker, getNoobProHackerById } from '../eventNoobProHackerAdapters';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { useRouter } from 'next/router';

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

export const useQueryEventNoobProHacker = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<EventNoobProHacker> = useQuery(
      ['getEventNoobProHacker'],
      () => getNoobProHackerById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
