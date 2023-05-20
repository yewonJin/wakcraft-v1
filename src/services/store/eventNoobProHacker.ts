import { atom } from 'recoil';

import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { createEventNoobProHackerObject } from '@/domain/eventNoobProHacker';

export const eventNoobProHackerLineState = atom<EventNoobProHacker['lineInfo']>({
   key: 'eventNoobProHackerLineState',
   default: createEventNoobProHackerObject().lineInfo,
});

export const eventNoobProHackerContentState = atom<EventNoobProHacker['contentInfo']>({
   key: 'eventNoobProHackerContentState',
   default: createEventNoobProHackerObject().contentInfo,
});

export const lineCountState = atom({
   key: 'lineCountState',
   default: 5,
});

export const architectCountPerLineState = atom({
   key: 'architectCountPerLineState',
   default: 3,
});