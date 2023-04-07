import { createNoobProHackerObject, NoobProHacker } from '@/Domain/noobProHacker';
import { atom } from 'recoil';

export const lineInfoState = atom<NoobProHacker['lineInfo']>({
   key: 'lineInfoState',
   default: [createNoobProHackerObject().lineInfo[0]],
});

export const curLineIndexState = atom({
   key: 'curLineIndex',
   default: 0,
});

export const isEmptyState = atom({
   key: 'isEmptyState',
   default: true,
});

export const searchInputState = atom({
   key: 'searchInputState',
   default: '',
});

export const lineDetailIndexState = atom({
   key: 'lineDetailIndexState',
   default: 0,
});
