import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { createNoobProHackerObject, NoobProHacker } from '@/domain/noobProHacker';
import { checkEmptyInDeepObject } from '@/utils/lib';
import {
   contentInfoState,
   curLineIndexState,
   isEmptyState,
   lineDetailIndexState,
   lineInfoState,
   searchInputState,
} from '@/services/store/noobProHacker';
import { useMutationNoobProHacker } from '@/services/noobProHackerAdapters';

const replaceItemAtIndex = (arr: NoobProHacker['lineInfo'], index: number, newValue: NoobProHacker['lineInfo'][0]) => {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const useCreateContentInfo = () => {
   const [contentInfo, setContentInfo] = useRecoilState(contentInfoState);

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

export const useCreateLineInfo = () => {
   const [lineInfo, setLineInfo] = useRecoilState(lineInfoState);
   const [curLineIndex, setCurLineIndex] = useRecoilState(curLineIndexState);
   const [isEmpty, setIsEmpty] = useRecoilState(isEmptyState);
   const [searchInput, setSearchInput] = useRecoilState(searchInputState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   /** 어느 라인을 수정할지 선택하는 함수*/
   const setStateCurLineIndex = (index: number) => {
      setCurLineIndex(index);
   };

   /** 빈 상태를 업데이트하는 함수 */
   const setEmptyState = (boolean: boolean) => {
      setIsEmpty(boolean);
   };

   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
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

   /** 검색한 건축가를 라인에 추가하는 함수 */
   const addArchitectToLine = (minecraft_id: string) => {
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

   /** 현재 보고있는 라인을 초기화하는 함수 */
   const resetLineInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (curLineIndex === 0) {
         const newValue = createNoobProHackerObject().lineInfo[0];

         const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);

         setLineInfo(newArr);
      } else {
         setLineInfo(lineInfo.filter((_, index) => index !== curLineIndex));
         setStateCurLineIndex(curLineIndex - 1);
      }

      setLineDetailIndex(0);
   };

   /** 입력한 라인을 새로 추가하는 함수 */
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
      addArchitectToLine,
      resetLineInfo,
      addLineInfo,
   };
};

export const useCreateNoobProHacker = () => {
   const { lineInfo } = useCreateLineInfo();
   const { contentInfo } = useCreateContentInfo();

   const mutation = useMutationNoobProHacker();

   const addNoobProHacker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(contentInfo)) {
         console.log('컨텐츠 미완성');
         return;
      }

      if (lineInfo.length < 5) {
         console.log('라인 부족');
         return;
      }

      if (checkEmptyInDeepObject(lineInfo[4])) {
         console.log('라인: 5 미완성');
         return;
      }

      mutation.mutate({
         contentInfo,
         lineInfo,
      });
   };

   return { addNoobProHacker };
};
