import { Architect } from '@/domain/architect';
import { getArchitectByFuzzySearch, getArchitectByTier } from '@/services/api/architect';
import { searchCurrentTierState } from '@/services/store/architect';
import { useState, ChangeEvent } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

export const useShowArchitect = () => {
   const [curTier, setCurTier] = useRecoilState(searchCurrentTierState);
   const [input, setInput] = useState('');

   const { data }: UseQueryResult<Architect[]> = useQuery(['architectByTier', curTier], () =>
      getArchitectByTier(curTier),
   );

   const { data: searchData }: UseQueryResult<Architect[]> = useQuery(['architectByfuzzySearch', input], () =>
      getArchitectByFuzzySearch(input),
   );

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   const setNavCurrentTier = (tier: string) => {
      setCurTier(tier);
   };

   const resetInput = () => {
      setInput('');
   };

   return { data, searchData, input, handleChange, curTier, setNavCurrentTier, resetInput };
};
