import { Architect, createTierArray } from '@/domain/architect';
import { NoobProHacker } from '@/domain/noobProHacker';

export const translateTier = (tier: string) => {
   switch (tier) {
      case 'hacker':
         return '해커';
      case 'gukbap':
         return '국밥';
      case 'pro':
         return '프로';
      case 'gyeruik':
         return '계륵';
      case 'noob':
         return '눕';

      default:
         return 'null';
   }
};

export const checkEmptyInDeepObject = (obj: object) => {
   var check = true;

   const recursiveFunction = (obj: object) => {
      Object.values(obj).map(item => {
         if (item === '') check = false;

         if (typeof item === 'object') {
            recursiveFunction(item);
         }
      });
   };

   recursiveFunction(obj);

   return check;
};

export const convertLineTierToTier = (req: string) => {
   if (req === 'hacker') return createTierArray().slice(0, 4);
   else if (req === 'gukbap') return createTierArray().slice(4, 7);
   else if (req === 'pro') return createTierArray().slice(7, 8);
   else if (req === 'gyeruik') return createTierArray().slice(8, 10);
   else return createTierArray().slice(10);
};

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Omit<Architect['portfolio'], 'placementTest'>;
};

type Line = 'noob' | 'pro' | 'hacker';

/** 눕프핵 정보를 건축가 정보로 변환하는 함수 */
export const convertNoobProHackerToArchitect = (req: { body: NoobProHacker }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach(line => {
      for (const key in line.line_details) {
         const portfolioInfo: Architect['portfolio']['noobProHacker'][0] = {
            episode: contentInfo.episode,
            subject: line.subject,
            line: key as '눕' | '프로' | '해커',
            image_url: line.line_details[key as Line].image_url,
            youtube_url: line.line_details[key as Line].youtube_url,
            ranking: line.line_details[key as Line].ranking,
         };

         architectsInfo.push({
            minecraft_id: line.line_details[key as Line].minecraft_id,
            portfolio: {
               noobProHacker: [portfolioInfo],
            },
         });
      }
   });

   return architectsInfo;
};
