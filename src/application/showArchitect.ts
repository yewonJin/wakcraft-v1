import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';

import { Architect } from '@/domain/architect';
import { searchCurrentTierState } from '@/services/store/architect';
import { fuzzySearch, fuzzySearchRegExp } from '@/utils/fuzzySearch';
import { createTierArray } from '@/domain/architect';

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

   const [sortByTier, setSortByTier] = useState(1);
   const [sortByParticipation, setSortByParticipation] = useState(0);
   const [sortByNumberOfWin, setSortByNumberOfWin] = useState(0);

   const sort = (architects: Architect[]) => {
      if (sortByTier === 1) {
         return architects;
      } else if (sortByTier === -1) {
         return architects.sort((a, b) => {
            if (a.tier[a.tier.length - 1] === '언랭') return 0;

            return (
               createTierArray().indexOf(b.tier[a.tier.length - 1]) -
               createTierArray().indexOf(a.tier[b.tier.length - 1])
            );
         });
      }

      if (sortByParticipation === 1) {
         return architects.sort((a, b) => b.noobProHackerInfo.participation - a.noobProHackerInfo.participation);
      } else if (sortByParticipation === -1) {
         return architects.sort((a, b) => a.noobProHackerInfo.participation - b.noobProHackerInfo.participation);
      }

      if (sortByNumberOfWin === 1) {
         return architects.sort((a, b) => b.noobProHackerInfo.win - a.noobProHackerInfo.win);
      } else if (sortByNumberOfWin === -1) {
         return architects.sort((a, b) => a.noobProHackerInfo.win - b.noobProHackerInfo.win);
      } else return architects;
   };

   const handleSortButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
      switch (e.currentTarget.name) {
         case 'tier':
            setSortByNumberOfWin(0);
            setSortByParticipation(0);
            if (sortByTier === 0) setSortByTier(1);
            else setSortByTier(prev => prev * -1);
            break;

         case 'participation':
            setSortByNumberOfWin(0);
            setSortByTier(0);
            if (sortByParticipation === 0) setSortByParticipation(1);
            else setSortByParticipation(prev => prev * -1);
            break;

         case 'win':
            setSortByParticipation(0);
            setSortByTier(0);
            if (sortByNumberOfWin === 0) setSortByNumberOfWin(1);
            else setSortByNumberOfWin(prev => prev * -1);
            break;
      }
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   const setNavCurrentTier = (tier: string) => {
      setCurTier(tier);
   };

   const resetInput = () => {
      setInput('');
   };

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
      sortByTier,
      sortByNumberOfWin,
      sortByParticipation,
      input,
      handleChange,
      handleSortButtonClick,
      sort,
      curTier,
      setNavCurrentTier,
      resetInput,
      fuzzySearchAndHighlightResult,
   };
};
