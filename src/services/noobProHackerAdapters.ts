import { useMutation, useQueryClient } from 'react-query';

import { NoobProHacker } from '@/domain/noobProHacker';
import { addNoobProHacker } from './api/noobProHacker';
import { toast } from 'react-hot-toast';

export const useMutationNoobProHacker = () => {

   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: NoobProHacker) =>
      toast.promise(addNoobProHacker(body), {
         loading: '추가중',
         success: '추가 완료',
         error: '에러 발생',
      }),
   );

   return mutation;
};
