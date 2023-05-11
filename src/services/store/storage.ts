import { atom } from 'recoil';

export const storageViewableState = atom({
   key: 'storageViewableState',
   default: false,
});

export const storagePageState = atom({
   key: 'storagePageState',
   default: 0,
});
