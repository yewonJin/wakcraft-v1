import { Architect, Tier } from './architect';

export type MatchYourTier = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   participants: {
      order: number;
      expectedTier: Tier;
      currentTier: Tier;
      minecraft_id: string;
      image_url: string;
      youtube_url: string;
      ranking: number;
   }[];
};

export const createMatchYourTierObject = (): MatchYourTier => {
   return {
      contentInfo: {
         contentName: '',
         episode: 0,
         date: '',
         youtube_url: '',
      },
      participants: [],
   };
};

export const convertToArchitect = (req: { body: MatchYourTier }) => {
   const { participants } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   participants.forEach(architect => {
      architectsInfo.push({
         minecraft_id: architect.minecraft_id,
         portfolio: {
            eventNoobProHacker: [
               {
                  episode: req.body.contentInfo.episode,
                  image_url: architect.image_url,
                  subject: `${architect.expectedTier} -> ${architect.currentTier}`,
                  ranking: architect.ranking,
                  line: '',
                  contentName: req.body.contentInfo.contentName,
                  youtube_url: architect.youtube_url,
                  date: new Date(req.body.contentInfo.date),
               },
            ],
         },
      });
   });

   return architectsInfo;
};

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'eventNoobProHacker'>;
};
