import { ChangeEvent, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { createNoobProHackerObject, NoobProHacker } from '@/Domain/noobProHacker';
import { checkEmptyInDeepObject } from '@/utils/lib';
import {
   curLineIndexState,
   isEmptyState,
   lineDetailIndexState,
   lineInfoState,
   searchInputState,
} from '@/Services/store/noobProHacker';

export const useCreateContentInfo = () => {
   const [contentInfo, setContentInfo] = useState<NoobProHacker['contentInfo']>(
      createNoobProHackerObject().contentInfo,
   );

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setContentInfo(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   return { contentInfo, handleChange };
};

const replaceItemAtIndex = (arr: NoobProHacker['lineInfo'], index: number, newValue: NoobProHacker['lineInfo'][0]) => {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const useCreateLineInfo = () => {
   const [lineInfo, setLineInfo] = useRecoilState(lineInfoState);
   const [curLineIndex, setCurLineIndex] = useRecoilState(curLineIndexState);
   const [isEmpty, setIsEmpty] = useRecoilState(isEmptyState);
   const [searchInput, setSearchInput] = useRecoilState(searchInputState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const setStateCurLineIndex = (index: number) => setCurLineIndex(index);
   const setEmptyState = (boolean: boolean) => setIsEmpty(boolean);

   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const handleArchitectClick = (minecraft_id: string) => {
      if (lineInfo[curLineIndex].line_details.hacker.minecraft_id !== '') return;

      const line = ['noob', 'pro', 'hacker'][lineDetailIndex] as 'noob' | 'pro' | 'hacker';

      const newValue = {
         ...lineInfo[curLineIndex],
         line_details: {
            ...lineInfo[curLineIndex].line_details,
            [line]: {
               ...lineInfo[curLineIndex].line_details[line],
               minecraft_id: minecraft_id,
            },
         },
      };

      const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);

      setLineDetailIndex(lineDetailIndex == 2 ? 0 : lineDetailIndex + 1);

      setLineInfo(newArr);
   };

   const handleLineDetailsChange = (e: ChangeEvent<HTMLInputElement>, line?: 'noob' | 'pro' | 'hacker') => {
      if (line) {
         const newValue = {
            ...lineInfo[curLineIndex],
            line_details: {
               ...lineInfo[curLineIndex].line_details,
               [line]: {
                  ...lineInfo[curLineIndex].line_details[line],
                  [e.target.name]: e.target.name === 'ranking' ? parseInt(e.target.value) : e.target.value,
               },
            },
         };

         const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);
         setLineInfo(newArr);
      } else {
         const newValue = {
            ...lineInfo[curLineIndex],
            [e.target.name]: e.target.name === 'line_ranking' ? parseInt(e.target.value) : e.target.value,
         };
         const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);
         setLineInfo(newArr);
      }
   };

   const resetLineInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (curLineIndex === 0) return;

      setLineInfo(lineInfo.filter((_, index) => index !== curLineIndex));

      setStateCurLineIndex(curLineIndex - 1);
   };

   const addLineInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (checkEmptyInDeepObject(lineInfo[curLineIndex])) {
         setEmptyState(false);

         if (lineInfo.length < 5) {
            const newArr = [...lineInfo];

            newArr.push(createNoobProHackerObject().lineInfo[0]);

            setStateCurLineIndex(curLineIndex > 5 ? curLineIndex : curLineIndex + 1);

            setLineInfo(newArr);
         }
      }
   };

   return {
      lineInfo,
      curLineIndex,
      setStateCurLineIndex,
      setEmptyState,
      searchInput,
      handleSearchInputChange,
      handleLineDetailsChange,
      handleArchitectClick,
      resetLineInfo,
      addLineInfo,
   };
};
