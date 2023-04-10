import { atom } from 'recoil';

export const architectInfoState = atom({
   key: 'architectInfoState',
   default: {
      minecraft_id: '',
      wakzoo_id: '',
      tier: '마카게',
   },
});
