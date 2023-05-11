import { createNoobProHackerObject, NoobProHacker } from '@/domain/noobProHacker';
import { atom } from 'recoil';

export const noobProHackerLineState = atom<NoobProHacker['lineInfo']>({
   key: 'noobProHackerLineState',
   default: [createNoobProHackerObject().lineInfo[0]],
});

export const noobProHackerContentState = atom<NoobProHacker['contentInfo']>({
   key: 'noobProHackerContentState',
   default: createNoobProHackerObject().contentInfo,
});

export const curLineIndexState = atom({
   key: 'curLineIndexState',
   default: 0,
});

export const curLineTierState = atom<'noob' | 'pro' | 'hacker'>({
   key: 'curLineTierState',
   default: 'noob',
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
