import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

import { checkEmptyInDeepObject } from '@/utils/lib';
import { architectContentInfoState } from '@/services/store/architect';
import { useMutationArchitect } from '@/services/architectAdapters';

export const useCreateArchitect = () => {
   const [architectInfo, setArchitectInfo] = useRecoilState(architectContentInfoState);

   const { mutate } = useMutationArchitect();

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
         mutate(architectInfo);
      } else {
         toast.error('빈 입력 창이 있습니다.');
      }
   };

   return { architectInfo, handleChange, addArchitect };
};
