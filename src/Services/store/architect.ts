import { atom } from 'recoil';

export const architectContentInfoState = atom({
   key: 'architectContentInfoState',
   default: {
      minecraft_id: '',
      wakzoo_id: '',
      tier: '마카게',
   },
});

export const searchCurrentTierState = atom({
   key: 'searchCurrentTierState',
   default: 'hacker',
});
