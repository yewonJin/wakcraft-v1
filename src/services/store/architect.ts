import { atom } from 'recoil';

export const architectContentInfoState = atom({
   key: 'architectContentInfoState',
   default: {
      minecraft_id: '',
      wakzoo_id: '',
      tier: '언랭',
   },
});

export const searchCurrentTierState = atom({
   key: 'searchCurrentTierState',
   default: 'hacker',
});
