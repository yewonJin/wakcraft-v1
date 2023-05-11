import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { NoobProHacker } from '@/domain/noobProHacker';
import { PlacementTest } from '@/domain/placementTest';
import { curLineIndexState, curLineTierState, noobProHackerLineState } from '@/services/store/noobProHacker';
import { participantsInfoState } from '@/services/store/placementTest';
import { storagePageState, storageViewableState } from '@/services/store/storage';
import { replaceItemAtIndex } from '@/utils/lib';

export const useAwsStorage = () => {
   const [isViewable, setIsViewable] = useRecoilState(storageViewableState);
   const [noobProHackerLine, setNoobProHackerLine] = useRecoilState(noobProHackerLineState);
   const [storagePage, setStoragePage] = useRecoilState(storagePageState);
   const setParticipantsInfo = useSetRecoilState(participantsInfoState);
   const curLineTier = useRecoilValue(curLineTierState);
   const curLineIndex = useRecoilValue(curLineIndexState);
   
   const setImageUrlToContent = (minecraftContent: string, imageName: string) => {
      if (minecraftContent === 'noobProHacker') setImageUrlToNoobProHacker(imageName);
      else if (minecraftContent === 'placementTest') setImageUrlToPlacementTest(imageName);
   };

   const setAllImageUrlToPlacementTest = (imagesName: string[]) => {
      if (!imagesName) return;

      imagesName.forEach(imageName => {
         const newValue: PlacementTest['participants'][0] = {
            minecraft_id: imageName.split('/')[2].split('.')[0],
            image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
            placement_result: '언랭',
         };

         setParticipantsInfo(prev => [...prev, newValue]);
      });
   };

   const setImageUrlToNoobProHacker = (imageName: string) => {
      const newValue = {
         ...noobProHackerLine[curLineIndex],
         line_details: {
            ...noobProHackerLine[curLineIndex].line_details,
            [curLineTier]: {
               ...noobProHackerLine[curLineIndex].line_details[curLineTier],
               image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
            },
         },
      };

      const newArr: NoobProHacker['lineInfo'] = replaceItemAtIndex(noobProHackerLine, curLineIndex, newValue);
      setNoobProHackerLine(newArr);
      setStoragePage(0);
      setIsViewable(false);
   };

   const setImageUrlToPlacementTest = (imageName: string) => {
      const newValue: PlacementTest['participants'][0] = {
         minecraft_id: imageName.split('/')[2].split('.')[0],
         image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
         placement_result: '언랭',
      };

      setParticipantsInfo(prev => [...prev, newValue]);
   };

   return {
      storagePage,
      setStoragePage,
      curLineTier,
      curLineIndex,
      isViewable,
      setIsViewable,
      setImageUrlToContent,
      setAllImageUrlToPlacementTest,
   };
};
