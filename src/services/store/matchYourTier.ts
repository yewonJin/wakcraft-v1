import { atom } from 'recoil';

import { MatchYourTier } from '@/domain/matchYourTier';
import { createMatchYourTierObject } from '@/domain/matchYourTier';

export const matchYourTierParticipantsState = atom<MatchYourTier['participants']>({
   key: 'matchYourTierParticipantsState',
   default: createMatchYourTierObject().participants,
});

export const matchYourTierContentState = atom<MatchYourTier['contentInfo']>({
   key: 'matchYourTierContentState',
   default: createMatchYourTierObject().contentInfo,
});
