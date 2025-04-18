import { useState, ChangeEvent, FormEvent } from 'react';

import { useMutationUpdateArchitect } from '@/services/architectAdapters';

export const useUpdateArchitect = () => {
   const [originalId, setOriginalId] = useState('');
   const [input, setInput] = useState({
      minecraft_id: '',
      wakzoo_id: '',
      tier: '언랭',
   });

   const mutation = useMutationUpdateArchitect();

   const handleClick = (minecraft_id: string, wakzoo_id: string, tier: string) => {
      setInput(prev => ({
         ...prev,
         minecraft_id: minecraft_id,
         wakzoo_id: wakzoo_id,
         tier: tier,
      }));
      setOriginalId(minecraft_id);
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setInput(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { minecraft_id, wakzoo_id, tier } = input;

      mutation.mutate({ originalId, minecraft_id, wakzoo_id, tier });

      setInput(prev => ({
         ...prev,
         minecraft_id: '',
         wakzoo_id: '',
         tier: '',
      }));

      setOriginalId('');
   };

   return { originalId, input, handleClick, handleChange, handleSubmit };
};
