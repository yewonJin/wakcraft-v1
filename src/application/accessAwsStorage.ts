import { NoobProHacker } from '@/domain/noobProHacker';
import { curLineIndexState, curLineState, lineInfoState } from '@/services/store/noobProHacker';
import { storagePageState, storageState } from '@/services/store/storage';
import { useRecoilState, useRecoilValue } from 'recoil';

const replaceItemAtIndex = (arr: NoobProHacker['lineInfo'], index: number, newValue: NoobProHacker['lineInfo'][0]) => {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const useAwsStorage = () => {
   const [lineInfo, setLineInfo] = useRecoilState(lineInfoState);
   const [page, setPage] = useRecoilState(storagePageState);
   const [viewStorage, setViewStorage] = useRecoilState(storageState);
   const curLine = useRecoilValue(curLineState);
   const curLineIndex = useRecoilValue(curLineIndexState);

   const setStateViewStorage = (boo: boolean) => {
      setViewStorage(boo);
   };

   const setStatePage = (num: number) => {
      setPage(num);
   };

   const handleImageClick = (name: string) => {
      const newValue = {
         ...lineInfo[curLineIndex],
         line_details: {
            ...lineInfo[curLineIndex].line_details,
            [curLine]: {
               ...lineInfo[curLineIndex].line_details[curLine],
               image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${name}`,
            },
         },
      };

      const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);
      setLineInfo(newArr);
      setPage(0);
      setViewStorage(false);
   };

   return { page, setStatePage, curLine, curLineIndex, setStateViewStorage, handleImageClick };
};
