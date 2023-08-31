import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { produce } from 'immer';

import { participantsInfoState, placementTestInfoState } from '@/services/store/placementTest';

import { useMutationPlacementTestApplying } from '@/services/placementTestAdapters';

export type PlacementTestApplyingPayload = {
   minecraft_id: string;
   cafe_url: string;
};

export const useCreateTempPlacementTest = () => {
   const [placementTestInfo, setPlacementTestInfo] = useRecoilState(placementTestInfoState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(participantsInfoState);

   const mutation = useMutationPlacementTestApplying();

   const addToDB = () => {
      const arr: PlacementTestApplyingPayload[] = participantsInfo.map(item => ({
         minecraft_id: item.minecraft_id,
         cafe_url: item.cafe_url,
      }));

      mutation.mutate(arr);
   };

   const changePlacementTestInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setPlacementTestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const changePlacementTestCafeURL = (index: number, value: string) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].cafe_url = value;
         }),
      );
   };

   const addArchitect = (minecraft_id: string) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft.push({ minecraft_id: minecraft_id, image_url: '', placement_result: '언랭', cafe_url: '' });
         }),
      );
   };

   return {
      placementTestInfo,
      participantsInfo,
      addToDB,
      changePlacementTestInfo,
      changePlacementTestCafeURL,
      addArchitect,
   };
};
