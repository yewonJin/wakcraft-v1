import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';

import { participantsInfoState, placementTestInfoState } from '@/services/store/placementTest';
import { replaceItemAtIndex } from '@/utils/lib';
import { PlacementTest } from '@/domain/placementTest';
import { Tier } from '@/domain/architect';
import { useMutationPlacementTest } from '@/services/placementTestAdapters';

export const useCreatePlacementTest = () => {
   const [placementTestInfo, setPlacementTestInfo] = useRecoilState(placementTestInfoState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(participantsInfoState);
   const mutation = useMutationPlacementTest();

   const addToDB = () => {
      mutation.mutate({ ...placementTestInfo, participants: participantsInfo });
   };

   const changePlacementTestInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setPlacementTestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const changePlacementTestTier = (index: number, value: Tier) => {
      const newValue = {
         ...participantsInfo[index],
         placement_result: value,
      };

      const newArr: PlacementTest['participants'] = replaceItemAtIndex(participantsInfo, index, newValue);

      setParticipantsInfo(newArr);
   };

   return {
      participantsInfo,
      addToDB,
      changePlacementTestInfo,
      changePlacementTestTier,
   };
};
