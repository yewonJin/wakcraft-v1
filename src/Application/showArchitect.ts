import { Architect } from '@/domain/architect';
import { getArchitects } from '@/services/api/architect';
import { searchCurrentTierState } from '@/services/store/architect';
import { useState, ChangeEvent } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

export const useShowArchitect = () => {
   const { data }: UseQueryResult<Architect[]> = useQuery('architect', getArchitects);

   const [curTier, setCurTier] = useRecoilState(searchCurrentTierState);
   const [input, setInput] = useState('');

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   const setNavCurrentTier = (tier: string) => {
      setCurTier(tier);
   };

   return { data, input, handleChange, curTier, setNavCurrentTier };
};
