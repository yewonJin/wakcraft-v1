import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { produce } from 'immer';

import { NoobProHacker } from '@/domain/noobProHacker';
import { PlacementTest } from '@/domain/placementTest';
import {
   curLineIndexState,
   curLineTierState,
   lineDetailIndexState,
   noobProHackerLineState,
} from '@/services/store/noobProHacker';
import { participantsInfoState } from '@/services/store/placementTest';
import { storagePageState, storageViewableState } from '@/services/store/storage';
import { replaceItemAtIndex } from '@/utils/lib';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { eventNoobProHackerLineState } from '@/services/store/eventNoobProHacker';

export const useAwsStorage = () => {
   const [isViewable, setIsViewable] = useRecoilState(storageViewableState);
   const [noobProHackerLine, setNoobProHackerLine] = useRecoilState(noobProHackerLineState);
   const [eventNoobProHackerLine, setEventNoobProHackerLine] =
      useRecoilState<EventNoobProHacker['lineInfo']>(eventNoobProHackerLineState);
   const [storagePage, setStoragePage] = useRecoilState(storagePageState);
   const setParticipantsInfo = useSetRecoilState(participantsInfoState);
   const curLineTier = useRecoilValue(curLineTierState);
   const curLineIndex = useRecoilValue(curLineIndexState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const setContentImageUrl = (minecraftContent: string, imageName: string) => {
      if (minecraftContent === 'noobProHacker') setNoobProHackerImageUrl(imageName);
      else if (minecraftContent === 'placementTest') setPlacementTestImageUrl(imageName);
      else if (minecraftContent === 'eventNoobProHacker') setEventNoobProHackerImageUrl(imageName);
   };

   const setPlacementTestAllImageUrl = (imagesName: string[]) => {
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

   const setNoobProHackerImageUrl = (imageName: string) => {
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

   const setEventNoobProHackerImageUrl = (imageName: string) => {
      setEventNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[
               lineDetailIndex
            ].image_url = `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`;
         }),
      );

      setStoragePage(0);
      setIsViewable(false);
   };

   const setPlacementTestImageUrl = (imageName: string) => {
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
      setContentImageUrl,
      setPlacementTestAllImageUrl,
      setEventNoobProHackerImageUrl,
   };
};
