import { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

import { useMutationLogin } from '@/services/authAdapcter';

export const useLogin = () => {
   const [input, setInput] = useState({
      username: '',
      password: '',
   });

   const { isLoading, mutate } = useMutationLogin();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const login = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!input.username || !input.password) {
         toast.error('아이디와 비밀번호를 모두 입력해야 합니다.');
         return;
      }

      mutate(input);
   };

   return { input, isLoading, handleChange, login };
};
