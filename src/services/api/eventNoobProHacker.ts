import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

import { addEventNoobProHacker, getEventNoobProHacker } from '../eventNoobProHackerAdapters';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';

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
   const { data: result }: UseQueryResult<EventNoobProHacker> = useQuery(
      ['getEventNoobProHacker'],
      () => getEventNoobProHacker(),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
