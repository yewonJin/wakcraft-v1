import { useMutationLogin } from '@/services/authAdapcter';
import { useState, ChangeEvent, FormEvent } from 'react';

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

   const handleClick = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate(input);
   };

   return { input, isLoading, handleChange, handleClick };
};
