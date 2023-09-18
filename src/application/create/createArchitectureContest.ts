import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { produce } from 'immer';
import { toast } from 'react-hot-toast';

import { checkEmptyInDeepObject } from '@/utils/lib';
import { curLineIndexState, lineDetailIndexState } from '@/services/store/noobProHacker';
import { architectureContestContentState, architectureContestLineState } from '@/services/store/architectureContest';
import { ArchitectureContest } from '@/domain/architectureContest';
import {
   useMutationArchitectureContest,
   useMutationEditArchitectureContest,
} from '@/services/architectureContestAdapters';
import { useAwsStorage } from '../aws/accessAwsStorage';

export const useCreateArchitectureContestContent = () => {
   const [architectureContestContent, setArchitectureContestContent] = useRecoilState(architectureContestContentState);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArchitectureContestContent(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   return { architectureContestContent, handleChange };
};

export const useCreateArchitectureContestLine = () => {
   const [architectureContestLine, setArchitectureContestLine] =
      useRecoilState<ArchitectureContest['lineInfo']>(architectureContestLineState);

   const [curLineIndex, setCurLineIndex] = useRecoilState(curLineIndexState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const [searchInput, setSearchInput] = useState('');

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const { setIsViewable } = useAwsStorage();

   /** AWS Storage 창을 띄움 */
   const setLineImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.preventDefault();

      setIsViewable(true);
      setLineDetailIndex(index);
   };

   /** 검색한 건축가를 라인에 추가하는 함수 */
   const addToLine = (minecraft_id: string) => {
      if (architectureContestLine[curLineIndex].line_details[6].minecraft_id !== '') return;

      setArchitectureContestLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[lineDetailIndex].minecraft_id = minecraft_id;
         }),
      );

      setLineDetailIndex(lineDetailIndex == 6 ? 0 : lineDetailIndex + 1);
   };

   const changeCommonLineInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setArchitectureContestLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex] = {
               ...draft[curLineIndex],
               [e.target.name]: e.target.value,
            };
         }),
      );
   };

   /** 라인 세부사항을 수정 */
   const changeLineDetails = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setArchitectureContestLine(prev =>
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

      setArchitectureContestLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details.forEach(item => {
               item.image_url = '';
               item.youtube_url = '';
               item.ranking = 0;
               item.minecraft_id = '';
            });
         }),
      );

      setLineDetailIndex(0);
   };

   const resetImage = (index: number) => {
      setArchitectureContestLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[index].image_url = '';
         }),
      );
   };

   return {
      setLineImage,
      architectureContestLine,
      addToLine,
      resetImage,
      changeCommonLineInfo,
      changeLineDetails,
      resetLine,
      searchInput,
      handleInputChange,
   };
};

export const useCreateArchitectureContest = () => {
   const [architectureContestLine, setArchitectureContestLine] = useRecoilState(architectureContestLineState);
   const [architectureContestContent, setArchitectureContestContent] = useRecoilState(architectureContestContentState);

   const addMutation = useMutationArchitectureContest();
   const editMutation = useMutationEditArchitectureContest();

   const putArchitectureContest = (item: ArchitectureContest) => {
      setArchitectureContestContent(item.contentInfo);
      setArchitectureContestContent(prev =>
         produce(prev, draft => {
            draft.date = item.contentInfo.date.split('T')[0];
         }),
      );

      setArchitectureContestLine(item.lineInfo);
   };

   const addArchitectureContest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(architectureContestContent)) {
         toast.error('컨텐츠 입력 폼에 빈 값이 있습니다.');
         return;
      }

      addMutation.mutate({
         contentInfo: architectureContestContent,
         lineInfo: architectureContestLine,
      });
   };

   const editArchitectureContest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!checkEmptyInDeepObject(architectureContestContent)) {
         toast.error('컨텐츠 입력 폼에 빈 값이 있습니다.');
         return;
      }

      editMutation.mutate({
         contentInfo: architectureContestContent,
         lineInfo: architectureContestLine,
      });
   };

   return { addArchitectureContest, putArchitectureContest, editArchitectureContest };
};
