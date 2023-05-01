import { atom } from 'recoil';

export const storageState = atom({
   key: 'storageState',
   default: false,
});

export const storagePageState = atom({
   key: 'storagePageState',
   default: 0,
});
