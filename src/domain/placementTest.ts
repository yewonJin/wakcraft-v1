import { Tier } from './architect';

export type PlacementTest = {
   season: number;
   date: string;
   youtube_url: string;
   participants: {
      minecraft_id: string;
      image_url: string;
      placement_result: Tier;
   }[];
};

export const createPlacementTestObject = (): PlacementTest => {
   return {
      season: 0,
      date: '',
      youtube_url: '',
      participants: [],
   };
};
