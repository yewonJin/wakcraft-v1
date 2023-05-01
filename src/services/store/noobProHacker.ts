import { createNoobProHackerObject, NoobProHacker } from '@/domain/noobProHacker';
import { atom } from 'recoil';

export const lineInfoState = atom<NoobProHacker['lineInfo']>({
   key: 'lineInfoState',
   default: [createNoobProHackerObject().lineInfo[0]],
});

export const contentInfoState = atom<NoobProHacker['contentInfo']>({
   key: 'contentInfoState',
   default: createNoobProHackerObject().contentInfo,
});

export const curLineIndexState = atom({
   key: 'curLineIndexState',
   default: 0,
});

export const curLineState = atom<'noob' | 'pro' | 'hacker'>({
   key: 'curLineState',
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
