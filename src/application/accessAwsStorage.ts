import { Tier } from '@/domain/architect';
import { NoobProHacker } from '@/domain/noobProHacker';
import { PlacementTest } from '@/domain/placementTest';
import { curLineIndexState, curLineState, lineInfoState } from '@/services/store/noobProHacker';
import { participantsInfoState } from '@/services/store/placementTest';
import { storagePageState, storageState } from '@/services/store/storage';
import { useRecoilState, useRecoilValue } from 'recoil';

const replaceItemAtIndex = (
   arr: NoobProHacker['lineInfo'] | PlacementTest['participants'],
   index: number,
   newValue: NoobProHacker['lineInfo'][0] | PlacementTest['participants'][0],
) => {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const useAwsStorage = () => {
   const [lineInfo, setLineInfo] = useRecoilState(lineInfoState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(participantsInfoState);
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

   const handleNoobProHackerImageClick = (name: string) => {
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

      const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue) as NoobProHacker['lineInfo'];
      setLineInfo(newArr);
      setPage(0);
      setViewStorage(false);
   };

   const handlePlacementTestImageClick = (name: string) => {
      const newValue: PlacementTest['participants'][0] = {
         minecraft_id: name.split('/')[2].split('.')[0],
         image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${name}`,
         placement_result: '언랭',
      };

      setParticipantsInfo(prev => [...prev, newValue]);
   };

   const setAllImagesToPlacementTest = (images: string[]) => {
      if (!images) return;

      images.forEach(item => {
         const newValue: PlacementTest['participants'][0] = {
            minecraft_id: item.split('/')[2].split('.')[0],
            image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${item}`,
            placement_result: '언랭',
         };

         setParticipantsInfo(prev => [...prev, newValue]);
      });
   };

   const handlePlacementTestTier = (index: number, value: Tier) => {
      const newValue = {
         ...participantsInfo[index],
         placement_result: value,
      };

      const newArr = replaceItemAtIndex(participantsInfo, index, newValue) as PlacementTest['participants'];

      setParticipantsInfo(newArr);
   };

   return {
      page,
      setStatePage,
      curLine,
      curLineIndex,
      setStateViewStorage,
      handleNoobProHackerImageClick,
      handlePlacementTestImageClick,
      setAllImagesToPlacementTest,
      handlePlacementTestTier,
   };
};
