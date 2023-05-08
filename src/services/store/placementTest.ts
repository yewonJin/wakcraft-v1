import { PlacementTest } from '@/domain/placementTest';
import { atom } from 'recoil';

export const placementTestInfoState = atom<Omit<PlacementTest, 'participants'>>({
   key: 'placementTestInfoState',
   default: {
      season: 0,
      date: '',
      youtube_url: '',
   },
});

export const participantsInfoState = atom<PlacementTest['participants']>({
   key: 'participantsInfoState',
   default: [],
});
