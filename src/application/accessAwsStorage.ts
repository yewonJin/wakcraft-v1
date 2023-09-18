import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { produce } from 'immer';

import { PlacementTest } from '@/domain/placementTest';
import {
   curLineIndexState,
   curLineTierState,
   lineDetailIndexState,
   noobProHackerLineState,
} from '@/services/store/noobProHacker';
import { participantsInfoState } from '@/services/store/placementTest';
import { storagePageState, storageViewableState } from '@/services/store/storage';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { eventNoobProHackerLineState } from '@/services/store/eventNoobProHacker';
import { ArchitectureContest } from '@/domain/architectureContest';
import { architectureContestLineState } from '@/services/store/architectureContest';
import { matchYourTierParticipantsState } from '@/services/store/matchYourTier';
import { MatchYourTier } from '@/domain/matchYourTier';

export const useAwsStorage = () => {
   const [isViewable, setIsViewable] = useRecoilState(storageViewableState);
   const [storagePage, setStoragePage] = useRecoilState(storagePageState);

   const [noobProHackerLine, setNoobProHackerLine] = useRecoilState(noobProHackerLineState);
   const curLineTier = useRecoilValue(curLineTierState);
   const curLineIndex = useRecoilValue(curLineIndexState);
   const [lineDetailIndex, setLineDetailIndex] = useRecoilState(lineDetailIndexState);

   const [eventNoobProHackerLine, setEventNoobProHackerLine] =
      useRecoilState<EventNoobProHacker['lineInfo']>(eventNoobProHackerLineState);

   const [architectureContestLine, setArchitectureContestLine] =
      useRecoilState<ArchitectureContest['lineInfo']>(architectureContestLineState);

   const setParticipantsInfo = useSetRecoilState(participantsInfoState);

   const setMatchYourTierInfo = useSetRecoilState(matchYourTierParticipantsState);

   const setContentImageUrl = (minecraftContent: string, imageName: string) => {
      if (minecraftContent === 'noobProHacker') setNoobProHackerImageUrl(imageName);
      else if (minecraftContent === 'placementTest') setPlacementTestImageUrl(imageName);
      else if (minecraftContent === 'eventNoobProHacker') setEventNoobProHackerImageUrl(imageName);
      else if (minecraftContent === 'architectureContest') setArchitectureContestImageUrl(imageName);
      else if (minecraftContent === 'matchYourTier') setMatchYourTierImageUrl(imageName);
   };

   const setPlacementTestAllImageUrl = (imagesName: string[]) => {
      if (!imagesName) return;

      imagesName.forEach(imageName => {
         const newValue: PlacementTest['participants'][0] = {
            minecraft_id: imageName.split('/')[2].split('.')[0],
            image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
            placement_result: '언랭',
            cafe_url: '',
         };

         setParticipantsInfo(prev => [...prev, newValue]);
      });
   };

   const setMathYourTierAllImageUrl = (imagesName: string[]) => {
      if (!imagesName) return;

      imagesName.forEach(imageName => {
         const newValue: MatchYourTier['participants'][0] = {
            minecraft_id: imageName.split('/')[2].split('.')[0],
            image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
            expectedTier: '언랭',
            currentTier: '언랭',
            youtube_url: '',
            ranking: 0,
            order: 0,
         };

         setMatchYourTierInfo(prev => [...prev, newValue]);
      });
   };

   const setNoobProHackerImageUrl = (imageName: string) => {
      setNoobProHackerLine(prev =>
         produce(prev, draft => {
            draft[curLineIndex].line_details[
               curLineTier
            ].image_url = `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`;
         }),
      );
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

   const setArchitectureContestImageUrl = (imageName: string) => {
      setArchitectureContestLine(prev =>
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
         cafe_url: '',
      };

      setParticipantsInfo(prev => [...prev, newValue]);
   };

   const setMatchYourTierImageUrl = (imageName: string) => {
      const newValue: MatchYourTier['participants'][0] = {
         minecraft_id: imageName.split('/')[2].split('.')[0],
         image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${imageName}`,
         expectedTier: '언랭',
         currentTier: '언랭',
         order: 0,
         youtube_url: 'null',
         ranking: 0,
      };

      setMatchYourTierInfo(prev => [...prev, newValue]);
   };

   return {
      storagePage,
      setStoragePage,
      curLineTier,
      curLineIndex,
      isViewable,
      setIsViewable,
      setContentImageUrl,
      setMathYourTierAllImageUrl,
      setPlacementTestAllImageUrl,
      setEventNoobProHackerImageUrl,
      setArchitectureContestImageUrl,
   };
};
