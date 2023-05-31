import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import { toast } from 'react-hot-toast';

import { eventNoobProHackerContentState, eventNoobProHackerLineState } from '@/services/store/eventNoobProHacker';
import { EventNoobProHacker, createEventNoobProHackerObject } from '@/domain/eventNoobProHacker';
import { checkEmptyInDeepObject } from '@/utils/lib';
import { curLineIndexState, lineDetailIndexState } from '@/services/store/noobProHacker';
import { useAwsStorage } from './accessAwsStorage';
import { useMutationEventNoobProHacker } from '@/services/eventNoobProHackerAdapters';

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
   const [tierCountPerLine, setTierCountPerLine] = useState<number>(0);
   const [contentSettingPage, setContentSettingPage] = useState(0);
   const [searchInput, setSearchInput] = useState('');
   const [curArchitectIndex, setCurArchitectIndex] = useState(0);

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

         case 'tierCountPerLine':
            setTierCountPerLine(parseInt(e.target.value));
            break;
      }
   };

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const addToLine = (minecraft_id: string) => {
      const tierMinecraftIdArr = eventNoobProHackerLine[curLineIndex].line_details[tierCountPerLine - 1].minecraft_id;

      if (tierMinecraftIdArr[tierMinecraftIdArr.length - 1] !== '') return;

      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[lineDetailIndex].minecraft_id[curArchitectIndex] = minecraft_id;
         }),
      );

      setCurArchitectIndex(prev => prev + 1);

      if (curArchitectIndex >= eventNoobProHackerLine[curLineIndex].line_details[lineDetailIndex].minecraft_id.length - 1) {
         setLineDetailIndex(lineDetailIndex == tierCountPerLine - 1 ? 0 : lineDetailIndex + 1);
         setCurArchitectIndex(0);
      }
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

   const setArchitectCountPerTier = (arr: number[]) => {
      for (let i = 0; i < lineCount; i++) {
         arr.forEach((item, index) => {
            setEventNoobProHackerLine(prev =>
               produce(prev, draft => {
                  draft[i].line_details[index].minecraft_id = new Array(item).fill('');
               }),
            );
         });
      }
   };

   const setLineCountAndArchitectCount = () => {
      setContentSettingPage(prev => prev + 1);

      const newValue = createEventNoobProHackerObject().lineInfo;

      for (let i = 1; i < lineCount; i++) {
         newValue.push(createEventNoobProHackerObject().lineInfo[0]);
      }

      for (let i = 0; i < lineCount; i++) {
         for (let j = 1; j < tierCountPerLine; j++) {
            newValue[i].line_details.push(createEventNoobProHackerObject().lineInfo[0].line_details[0]);
         }
      }

      setEventNoobProHackerLine(newValue);
   };

   const changeCommonLineInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex] = {
               ...draft[curLineIndex],
               [e.target.name]: e.target.name === 'line_ranking' ? parseInt(e.target.value) : e.target.value,
            };
         }),
      );
   };

   /** 라인 세부사항을 수정 */
   const changeLineDetails = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[index] = {
               ...draft[curLineIndex].line_details[index],
               [e.target.name]: e.target.name === 'ranking' ? parseInt(e.target.value) : e.target.value,
            };
         }),
      );
   };

   /** 현재 보고있는 라인을 초기화하는 함수 */
   const resetLine = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details.forEach(item => {
               item.image_url = '';
               item.youtube_url = '';
               item.ranking = 0;
               item.minecraft_id = [''];
            });
         }),
      );

      setLineDetailIndex(0);
   };

   const resetImage = (index: number) => {
      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[index].image_url = '';
         }),
      );
   };

   return {
      setLineImage,
      eventNoobProHackerLine,
      lineCount,
      searchInput,
      setLineTierName,
      handleInputChange,
      addToLine,
      tierCountPerLine,
      handleChange,
      setArchitectCountPerTier,
      contentSettingPage,
      setContentSettingPage,
      resetImage,
      changeCommonLineInfo,
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
