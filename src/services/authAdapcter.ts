import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

import { login } from './api/auth';

export const useMutationLogin = () => {
   const { isLoading, mutate } = useMutation((body: any) =>
      toast.promise(login(body), {
         loading: '로그인 중',
         success: '로그인 성공',
         error: err => err.response.data,
      }),
   );

   return { isLoading, mutate };
};
