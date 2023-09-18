import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { produce } from 'immer';

import { Tier } from '@/domain/architect';
import { matchYourTierContentState, matchYourTierParticipantsState } from '@/services/store/matchYourTier';
import { useMutationMatchYourTier } from '@/services/matchYourTierAdapters';

export const useCreateMatchYourTier = () => {
   const [contentInfo, setContentInfo] = useRecoilState(matchYourTierContentState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(matchYourTierParticipantsState);

   const mutation = useMutationMatchYourTier();

   const addToDB = () => {
      mutation.mutate({ contentInfo: contentInfo, participants: participantsInfo });
   };

   const changeContentInfo = (e: ChangeEvent<HTMLInputElement>) => {
      setContentInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const changeExpectedTier = (index: number, value: Tier) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].expectedTier = value;
         }),
      );
   };

   const changeCurrentTier = (index: number, value: Tier) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].currentTier = value;
         }),
      );
   };

   const changeOrder = (index: number, value: number) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].order = value;
         }),
      );
   };

   const changeRanking = (index: number, value: number) => {
      setParticipantsInfo(prev =>
         produce(prev, draft => {
            draft[index].ranking = value;
         }),
      );
   };

   return {
      contentInfo,
      participantsInfo,
      addToDB,
      changeContentInfo,
      changeExpectedTier,
      changeCurrentTier,
      changeOrder,
      changeRanking,
   };
};
