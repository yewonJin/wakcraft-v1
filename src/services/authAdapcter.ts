import { useMutation } from 'react-query';
import { login } from './api/auth';

export const useMutationLogin = () => {
   const { isLoading, mutate } = useMutation((body: any) => login(body));

   return {isLoading, mutate};
};
