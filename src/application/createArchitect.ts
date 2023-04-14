import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { checkEmptyInDeepObject } from '@/utils/lib';
import { architectContentInfoState } from '@/services/store/architect';
import { useMutationArchitect } from '@/services/architectAdapters';

export const useCreateArchitect = () => {
   const [architectInfo, setArchitectInfo] = useRecoilState(architectContentInfoState);

   const mutation = useMutationArchitect();

   const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setArchitectInfo(prev => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const addArchitect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (checkEmptyInDeepObject(architectInfo)) {
         setArchitectInfo(prev => {
            return {
               ...prev,
               minecraft_id: '',
               wakzoo_id: '',
            };
         });
         mutation.mutate(architectInfo);
      }
   };

   return { architectInfo, handleChange, addArchitect };
};
