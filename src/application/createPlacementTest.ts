import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { produce } from 'immer';

import { participantsInfoState, placementTestInfoState } from '@/services/store/placementTest';
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
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].placement_result = value;
         }),
      );
   };

   return {
      placementTestInfo,
      participantsInfo,
      addToDB,
      changePlacementTestInfo,
      changePlacementTestTier,
   };
};
