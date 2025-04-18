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
   const [sortByNumberOfHackerWin, setSortByNumberOfHackerWin] = useState(0);
   const [sortByNumberOfProWin, setSortByNumberOfProWin] = useState(0);

   const sort = (architects: Architect[]) => {
      if (sortByTier === 1) {
         return architects.sort((a, b) => {
            if (a.curTier === '언랭') return 0;

            return createTierArray().indexOf(a.curTier) - createTierArray().indexOf(b.curTier);
         });
      } else if (sortByTier === -1) {
         return architects.sort((a, b) => {
            if (a.curTier === '언랭') return 0;

            return createTierArray().indexOf(b.curTier) - createTierArray().indexOf(a.curTier);
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
      }

      if (sortByNumberOfHackerWin === 1) {
         return architects.sort((a, b) => b.noobProHackerInfo.hackerWin - a.noobProHackerInfo.hackerWin);
      } else if (sortByNumberOfHackerWin === -1) {
         return architects.sort((a, b) => a.noobProHackerInfo.hackerWin - b.noobProHackerInfo.hackerWin);
      }

      if (sortByNumberOfProWin === 1) {
         return architects.sort((a, b) => b.noobProHackerInfo.proWin - a.noobProHackerInfo.proWin);
      } else if (sortByNumberOfProWin === -1) {
         return architects.sort((a, b) => a.noobProHackerInfo.proWin - b.noobProHackerInfo.proWin);
      } else return architects;
   };

   const handleSortButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
      const resetAll = (exception: number) => {
         const arr = [
            () => setSortByTier(0),
            () => setSortByParticipation(0),
            () => setSortByNumberOfWin(0),
            () => setSortByNumberOfHackerWin(0),
            () => setSortByNumberOfProWin(0),
         ];

         arr.filter((_, index) => index !== exception).forEach(item => item());
      };

      switch (e.currentTarget.name) {
         case 'tier':
            resetAll(0);

            if (sortByTier === 0) setSortByTier(1);
            else setSortByTier(prev => prev * -1);
            break;

         case 'participation':
            resetAll(1);

            if (sortByParticipation === 0) setSortByParticipation(1);
            else setSortByParticipation(prev => prev * -1);
            break;

         case 'win':
            resetAll(2);
            if (sortByNumberOfWin === 0) setSortByNumberOfWin(1);
            else setSortByNumberOfWin(prev => prev * -1);
            break;
         case 'hackerWin':
            resetAll(3);
            if (sortByNumberOfHackerWin === 0) setSortByNumberOfHackerWin(1);
            else setSortByNumberOfHackerWin(prev => prev * -1);
            break;
         case 'proWin':
            resetAll(4);
            if (sortByNumberOfProWin === 0) setSortByNumberOfProWin(1);
            else setSortByNumberOfProWin(prev => prev * -1);
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
         .filter(
            architect =>
               fuzzySearch(architect.minecraft_id.toLowerCase(), inputA.toLowerCase()) ||
               fuzzySearch(architect.wakzoo_id.toLowerCase(), inputA.toLowerCase()),
         )
         .forEach((architect, index) => {
            const charArray = {
               minecraftId: architect.minecraft_id.toLowerCase().split(''),
               wakzooId: architect.wakzoo_id.toLowerCase().split(''),
            };

            const minecraftIdCharArray = architect.minecraft_id.toLowerCase().split('');
            const wakzooIdCharArray = architect.wakzoo_id.toLowerCase().split('');

            const highlightIndex: HighlightIndex = {
               minecraftId: [],
               wakzooId: [],
            };

            inputA.split('').forEach(char => {
               const lowerCaseChar = char.toLowerCase();

               if (char.match(/[ㄱ-힣]/g)) {
                  const korInput = fuzzySearchRegExp(char);

                  const a = charArray.wakzooId.join('').match(korInput);

                  if (!a) return;

                  highlightIndex.wakzooId.push(a.index as number);
               }

               if (minecraftIdCharArray.includes(lowerCaseChar)) {
                  highlightIndex.minecraftId.push(
                     minecraftIdCharArray.indexOf(
                        lowerCaseChar,
                        highlightIndex.minecraftId.length > 0
                           ? highlightIndex.minecraftId[highlightIndex.minecraftId.length - 1] + 1
                           : 0,
                     ),
                  );
               }

               if (wakzooIdCharArray.includes(lowerCaseChar)) {
                  highlightIndex.wakzooId.push(
                     wakzooIdCharArray.indexOf(
                        lowerCaseChar,
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
      sortByNumberOfHackerWin,
      sortByNumberOfProWin,
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
