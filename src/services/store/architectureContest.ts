import { atom } from 'recoil';

import { ArchitectureContest, createArchitectureContestObject } from '@/domain/architectureContest';

export const architectureContestLineState = atom<ArchitectureContest['lineInfo']>({
   key: 'architectureContestLineState',
   default: createArchitectureContestObject().lineInfo,
});

export const architectureContestContentState = atom<ArchitectureContest['contentInfo']>({
   key: 'architectureContestContentState',
   default: createArchitectureContestObject().contentInfo,
});

export const lineCountState = atom({
   key: 'architectureContestLineCountState',
   default: 7,
});

export const architectCountPerLineState = atom({
   key: 'architectureContestArchitectCountPerLineState',
   default: 7,
});