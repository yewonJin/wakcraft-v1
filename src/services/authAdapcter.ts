import { useMutation } from 'react-query';
import { login } from './api/auth';

export const useMutationLogin = () => {
   const mutation = useMutation((body: any) => login(body));

   return mutation;
};
