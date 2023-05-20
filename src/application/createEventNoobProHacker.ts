import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';

import { eventNoobProHackerContentState, eventNoobProHackerLineState } from '@/services/store/eventNoobProHacker';
import { EventNoobProHacker, createEventNoobProHackerObject } from '@/domain/eventNoobProHacker';
import { checkEmptyInDeepObject, replaceItemAtIndex } from '@/utils/lib';
import { curLineIndexState, lineDetailIndexState } from '@/services/store/noobProHacker';
import { useAwsStorage } from './accessAwsStorage';
import { useMutationEventNoobProHacker } from '@/services/api/eventNoobProHacker';
import { toast } from 'react-hot-toast';

export const useCreateEventNoobProHackerContent = () => {
   const [eventNoobProHackerContent, setEventNoobProHackerContent] = useRecoilState(eventNoobProHackerContentState);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEventNoobProHackerContent(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   return { eventNoobProHackerContent, handleChange };
};

export const useCreateEventNoobProHackerLine = () => {
   const [eventNoobProHackerLine, setEventNoobProHackerLine] =
      useRecoilState<EventNoobProHacker['lineInfo']>(eventNoobProHackerLineState);
   const [lineCount, setLineCount] = useState<number>(0);
   const [architectCountPerLine, setArchitectCountPerLine] = useState<number>(0);
   const [contentSettingPage, setContentSettingPage] = useState(0);
   const [searchInput, setSearchInput] = useState('');

   const [curLineIndex, setCurLineIndex] = useRecoilState(curLineIndexState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const { setIsViewable } = useAwsStorage();

   /** AWS Storage 창을 띄움 */
   const setLineImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.preventDefault();

      setIsViewable(true);
      setLineDetailIndex(index);
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
         case 'lineCount':
            setLineCount(parseInt(e.target.value));
            break;

         case 'architectCountPerLine':
            setArchitectCountPerLine(parseInt(e.target.value));
            break;
      }
   };

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const addToLine = (minecraft_id: string) => {
      if (eventNoobProHackerLine[curLineIndex].line_details[architectCountPerLine - 1].minecraft_id !== '') return;

      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[lineDetailIndex].minecraft_id = minecraft_id;
         }),
      );

      setLineDetailIndex(lineDetailIndex == architectCountPerLine - 1 ? 0 : lineDetailIndex + 1);
   };

   const setLineTierName = (arr: string[], lineCount: number) => {
      for (let i = 0; i < lineCount; i++) {
         arr.forEach((item, index) => {
            setEventNoobProHackerLine(prev =>
               produce(prev, draft => {
                  draft[i].line_details[index].line = item;
               }),
            );
         });
      }

      setContentSettingPage(prev => prev + 1);
   };

   const setLineCountAndArchitectCount = () => {
      setContentSettingPage(prev => prev + 1);

      const newValue = createEventNoobProHackerObject().lineInfo;

      for (let i = 1; i < lineCount; i++) {
         newValue.push(createEventNoobProHackerObject().lineInfo[0]);
      }

      for (let i = 0; i < lineCount; i++) {
         for (let j = 1; j < architectCountPerLine; j++) {
            newValue[i].line_details.push(createEventNoobProHackerObject().lineInfo[0].line_details[0]);
         }
      }

      setEventNoobProHackerLine(newValue);
   };

   const changeLine = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = {
         ...eventNoobProHackerLine[curLineIndex],
         [e.target.name]: e.target.name === 'line_ranking' ? parseInt(e.target.value) : e.target.value,
      };
      const newArr = replaceItemAtIndex(eventNoobProHackerLine, curLineIndex, newValue);
      setEventNoobProHackerLine(newArr);
   };

   /** 라인 세부사항을 수정 */
   const changeLineDetails = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = {
         ...eventNoobProHackerLine[curLineIndex].line_details[index],
         [e.target.name]: e.target.name === 'ranking' ? parseInt(e.target.value) : e.target.value,
      };

      const lineDetailsArr: EventNoobProHacker['lineInfo'][0]['line_details'] = replaceItemAtIndex(
         eventNoobProHackerLine[curLineIndex].line_details,
         index,
         newValue,
      );

      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details = lineDetailsArr;
         }),
      );
   };

   /** 현재 보고있는 라인을 초기화하는 함수 */
   const resetLine = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (curLineIndex === 0) {
         const newValue = createEventNoobProHackerObject().lineInfo[0];

         const newArr = replaceItemAtIndex(eventNoobProHackerLine, curLineIndex, newValue);

         setEventNoobProHackerLine(newArr);
      } else {
         setEventNoobProHackerLine(eventNoobProHackerLine.filter((_, index) => index !== curLineIndex));
         setCurLineIndex(curLineIndex - 1);
      }

      setLineDetailIndex(0);
   };

   return {
      setLineImage,
      eventNoobProHackerLine,
      lineCount,
      searchInput,
      setLineTierName,
      handleInputChange,
      addToLine,
      architectCountPerLine,
      handleChange,
      contentSettingPage,
      setContentSettingPage,
      changeLine,
      changeLineDetails,
      resetLine,
      setLineCountAndArchitectCount,
   };
};

export const useCreateEventNoobProHacker = () => {
   const [eventNoobProHackerLine, setEventNoobProHackerLine] = useRecoilState(eventNoobProHackerLineState);
   const [eventNoobProHackerContent, setEventNoobProHackerContent] = useRecoilState(eventNoobProHackerContentState);

   const mutation = useMutationEventNoobProHacker();

   const addEventNoobProHacker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(eventNoobProHackerContent)) {
         toast.error('컨텐츠 입력 폼에 빈 값이 있습니다.');
         return;
      }

      mutation.mutate({
         contentInfo: eventNoobProHackerContent,
         lineInfo: eventNoobProHackerLine,
      });
   };

   return { addEventNoobProHacker };
};
