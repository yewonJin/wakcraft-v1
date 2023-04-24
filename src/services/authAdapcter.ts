import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { login } from './api/auth';

export const useMutationLogin = () => {
   const { isLoading, mutate } = useMutation((body: any) => login(body), {
      onError(err: { message: string }) {
         toast.error(err.message);
      },
      onSuccess() {
         toast.loading('로그인중');
      },
   });

   return { isLoading, mutate };
};
