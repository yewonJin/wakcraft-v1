import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';
import { produce } from 'immer';

import { createNoobProHackerObject } from '@/domain/noobProHacker';
import { checkEmptyInDeepObject } from '@/utils/lib';
import {
   noobProHackerContentState,
   curLineTierState,
   isEmptyState,
   lineDetailIndexState,
   noobProHackerLineState,
   searchInputState,
   curLineIndexState,
} from '@/services/store/noobProHacker';
import { useMutationNoobProHacker } from '@/services/noobProHackerAdapters';
import { useAwsStorage } from './accessAwsStorage';

export const useCreateContent = () => {
   const [noobProHackerContent, setNoobProHackerContent] = useRecoilState(noobProHackerContentState);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNoobProHackerContent(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   return { noobProHackerContent, handleChange };
};

export const useCreateLine = () => {
   const [noobProHackerLine, setNoobProHackerLine] = useRecoilState(noobProHackerLineState);
   const [curLineTier, setCurLineTier] = useRecoilState(curLineTierState);
   const [curLineIndex, setCurLineIndex] = useRecoilState(curLineIndexState);
   const [isEmpty, setIsEmpty] = useRecoilState(isEmptyState);
   const [searchInput, setSearchInput] = useRecoilState(searchInputState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const { setIsViewable } = useAwsStorage();

   /** AWS Storage 창을 띄움 */
   const setLineImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, line: 'noob' | 'pro' | 'hacker') => {
      e.preventDefault();

      setIsViewable(true);
      setCurLineTier(line);
   };

   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const changeLineDetails = (e: ChangeEvent<HTMLInputElement>, line: 'noob' | 'pro' | 'hacker') => {
      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[line] = {
               ...draft[curLineIndex].line_details[line],
               [e.target.name]: e.target.name === 'ranking' ? parseInt(e.target.value) : e.target.value,
            };
         }),
      );
   };

   const changeLineCommonInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex] = {
               ...draft[curLineIndex],
               [e.target.name]: e.target.name === 'line_ranking' ? parseInt(e.target.value) : e.target.value,
            };
         }),
      );
   };

   /** 검색한 건축가를 라인에 추가하는 함수 */
   const addArchitectToLine = (minecraft_id: string) => {
      if (noobProHackerLine[curLineIndex].line_details.hacker.minecraft_id !== '') return;

      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[getCurLineName()].minecraft_id = minecraft_id;
         }),
      );

      setLineDetailIndex(lineDetailIndex == 2 ? 0 : lineDetailIndex + 1);
   };

   const getCurLineName = () => {
      return ['noob', 'pro', 'hacker'][lineDetailIndex] as 'noob' | 'pro' | 'hacker';
   };

   /** 현재 보고있는 라인을 초기화하는 함수 */
   const resetLine = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (curLineIndex === 0) {
         setNoobProHackerLine(prev =>
            produce(prev, draft => {
               draft[curLineIndex] = createNoobProHackerObject().lineInfo[0];
            }),
         );
      } else {
         setNoobProHackerLine(noobProHackerLine.filter((_, index) => index !== curLineIndex));
         setCurLineIndex(curLineIndex - 1);
      }

      setLineDetailIndex(0);
   };

   const resetImage = (line: 'noob' | 'pro' | 'hacker') => {
      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[line].image_url = '';
         }),
      );
   };

   /** 입력한 라인을 새로 추가하는 함수 */
   const addNewLine = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(noobProHackerLine[curLineIndex])) {
         return toast.error('빈 입력 창이 있습니다.');
      }

      if (noobProHackerLine.length === 5) return toast.success('라인 추가가 모두 완료되었습니다.');

      setIsEmpty(false);

      initializeNextLine();
   };

   const initializeNextLine = () => {
      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex + 1] = createNoobProHackerObject().lineInfo[0];
         }),
      );

      setCurLineIndex(curLineIndex > 5 ? curLineIndex : curLineIndex + 1);
   };

   return {
      setLineImage,
      noobProHackerLine,
      curLineIndex,
      setCurLineIndex,
      setIsEmpty,
      searchInput,
      handleSearchInputChange,
      changeLineDetails,
      changeLineCommonInfo,
      addArchitectToLine,
      resetLine,
      addNewLine,
      resetImage,
   };
};

export const useCreateNoobProHacker = () => {
   const { noobProHackerLine } = useCreateLine();
   const { noobProHackerContent } = useCreateContent();

   const mutation = useMutationNoobProHacker();

   const addNoobProHacker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(noobProHackerContent) || noobProHackerLine.length < 5) {
         toast.error('컨텐츠 입력 폼에 빈 값이 있습니다.');
         return;
      }

      if (!checkEmptyInDeepObject(noobProHackerLine[4])) {
         toast.error('5번째 라인이 완성되지 않았습니다.');
         return;
      }

      mutation.mutate({
         contentInfo: noobProHackerContent,
         lineInfo: noobProHackerLine,
      });
   };

   return { addNoobProHacker };
};
