import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { produce } from 'immer';

import { participantsInfoState, placementTestInfoState } from '@/services/store/placementTest';

import { useMutationTempPlacementTest } from '@/services/placementTestAdapters';

export const useCreateTempPlacementTest = () => {
   const [placementTestInfo, setPlacementTestInfo] = useRecoilState(placementTestInfoState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(participantsInfoState);
   const mutation = useMutationTempPlacementTest();

   const addToDB = () => {
      mutation.mutate({ ...placementTestInfo, participants: participantsInfo });
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
