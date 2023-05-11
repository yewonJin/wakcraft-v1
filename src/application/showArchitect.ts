import { useState, ChangeEvent } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { Architect } from '@/domain/architect';
import { getArchitectByFuzzySearch, getArchitectByTier } from '@/services/api/architect';
import { searchCurrentTierState } from '@/services/store/architect';
import { fuzzySearch, fuzzySearchRegExp } from '@/utils/fuzzySearch';

interface ArchitectWithIndexArr extends Architect {
   minecraftHighlightIndex: number[];
   wakzooHighlightIndex: number[];
}

interface HighlightIndex {
   minecraftId: number[];
   wakzooId: number[];
}

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

   /**  */
   const fuzzySearchAndHighlightResult = (architects: Architect[], inputA: string) => {
      const newArr: ArchitectWithIndexArr[] = [];

      architects
         .filter(architect => fuzzySearch(architect.minecraft_id, inputA) || fuzzySearch(architect.wakzoo_id, inputA))
         .forEach((architect, index) => {
            const charArray = {
               minecraftId: architect.minecraft_id.split(''),
               wakzooId: architect.wakzoo_id.split(''),
            };

            const minecraftIdCharArray = architect.minecraft_id.split('');
            const wakzooIdCharArray = architect.wakzoo_id.split('');

            const highlightIndex: HighlightIndex = {
               minecraftId: [],
               wakzooId: [],
            };

            inputA.split('').forEach(char => {
               if (char.match(/[ㄱ-힣]/g)) {
                  const korInput = fuzzySearchRegExp(char);

                  const a = charArray.wakzooId.join('').match(korInput);

                  if (!a) return;

                  highlightIndex.wakzooId.push(a.index as number);
               }

               if (minecraftIdCharArray.includes(char)) {
                  highlightIndex.minecraftId.push(
                     minecraftIdCharArray.indexOf(
                        char,
                        highlightIndex.minecraftId.length > 0
                           ? highlightIndex.minecraftId[highlightIndex.minecraftId.length - 1] + 1
                           : 0,
                     ),
                  );
               }

               if (wakzooIdCharArray.includes(char)) {
                  highlightIndex.wakzooId.push(
                     wakzooIdCharArray.indexOf(
                        char,
                        highlightIndex.wakzooId.length > 0
                           ? highlightIndex.wakzooId[highlightIndex.wakzooId.length - 1] + 1
                           : 0,
                     ),
                  );
               }
            });

            newArr[index] = {
               ...architect,
               minecraftHighlightIndex: highlightIndex.minecraftId,
               wakzooHighlightIndex: highlightIndex.wakzooId,
            };
         });

      return newArr.sort(
         (a, b) => parseInt(a.minecraftHighlightIndex.join('')) - parseInt(b.minecraftHighlightIndex.join('')),
      );
   };

   return {
      data,
      searchData,
      input,
      handleChange,
      curTier,
      setNavCurrentTier,
      resetInput,
      fuzzySearchAndHighlightResult,
   };
};
