import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { checkEmptyInDeepObject } from '@/utils/lib';
import { architectInfoState } from '@/services/store/architect';
import { useMutationArchitect } from '@/services/architectAdapters';

export const useCreateArchitect = () => {
   const [architectInfo, setArchitectInfo] = useRecoilState(architectInfoState);

   const mutation = useMutationArchitect();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArchitectInfo(prev => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const addArchitect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (checkEmptyInDeepObject(architectInfo)) {
         setArchitectInfo({
            minecraft_id: '',
            wakzoo_id: '',
            tier: '',
         });
         mutation.mutate(architectInfo);
      }
   };

   return { architectInfo, handleChange, addArchitect };
};
