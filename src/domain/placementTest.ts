import { Architect, Tier } from './architect';

export type PlacementTest = {
   season: number;
   date: string;
   youtube_url: string;
   participants: {
      minecraft_id: string;
      image_url: string;
      cafe_url: string;
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

/** 눕프핵 정보를 건축가 정보로 변환하는 함수 */
export const convertToArchitect = (req: { body: PlacementTest }) => {
   const { participants } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   participants.forEach(architect => {
      architectsInfo.push({
         minecraft_id: architect.minecraft_id,
         portfolio: {
            placementTest: [
               {
                  season: req.body.season,
                  image_url: architect.image_url,
                  placement_result: architect.placement_result,
                  date: new Date(req.body.date),
               },
            ],
         },
      });
   });

   return architectsInfo;
};

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'placementTest'>;
};
