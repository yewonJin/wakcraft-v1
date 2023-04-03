import { Tier } from './architect';

export type PlacementTest = {
   season: number;
   date: Date;
   participants: {
      minecraft_id: string;
      subject: string;
      image_url: string;
      placement_result: Tier;
   }[];
};
