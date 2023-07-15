import { NoobProHacker } from './noobProHacker';

type Line = 'noob' | 'pro' | 'hacker';

export type Tier =
   | '마카게'
   | '오마카세'
   | '해커'
   | '해장국'
   | '국밥'
   | '미지근한 국밥'
   | '식은 국밥'
   | '프로'
   | '계추'
   | '계륵'
   | '착한 눕'
   | '안 나쁜 눕'
   | '그냥 눕'
   | '진짜 눕'
   | '언랭';

export type Architect = {
   minecraft_id: string;
   wakzoo_id: string;
   tier: Tier[];
   curTier: Tier;
   noobProHackerInfo: {
      win: number;
      participation: number;
   };
   portfolio: {
      noobProHacker: {
         episode: number;
         subject: string;
         line: Line;
         image_url: string;
         youtube_url: string;
         ranking: number;
         date: Date;
      }[];
      placementTest: {
         season: number;
         image_url: string;
         placement_result: Tier;
         date: Date;
      }[];
      eventNoobProHacker: {
         contentName: string;
         episode: number;
         subject: string;
         line: string;
         image_url: string;
         youtube_url: string;
         ranking: number;
         date: Date;
      }[];
      architectureContest: {
         contentName: string;
         episode: number;
         subject: string;
         line: string;
         image_url: string;
         youtube_url: string;
         ranking: number;
         date: Date;
      }[];
   };
};

export const createTierArray = (): Tier[] => {
   return [
      '마카게',
      '오마카세',
      '해커',
      '해장국',
      '국밥',
      '미지근한 국밥',
      '식은 국밥',
      '프로',
      '계추',
      '계륵',
      '착한 눕',
      '안 나쁜 눕',
      '그냥 눕',
      '진짜 눕',
      '언랭',
   ];
};

export interface ArchitectWithSortPriority extends Architect {
   sortPriority: number;
}

/** 가장 많이 우승한 건축가 */
export const getMostWinsArchitect = (architects: ArchitectWithSortPriority[]) => {
   const maxValue = Math.max(...architects.map(item => item.noobProHackerInfo.win));

   return architects.filter(architect => architect.noobProHackerInfo.win === maxValue);
};

/** 가장 많이 참가한 건축가 */
export const getMostParticipationArchitect = (architects: ArchitectWithSortPriority[]) => {
   const maxValue = Math.max(...architects.map(item => item.noobProHackerInfo.participation));

   return architects.filter(architect => architect.noobProHackerInfo.participation === maxValue);
};

/** 티어 별 건축가 수 */
export const getNumberOfArchitectsByTier = (architects: ArchitectWithSortPriority[]) => {
   return {
      hacker: architects.filter(item => createTierArray().indexOf(item.curTier) <= 2).length,
      gukbap: architects.filter(
         item => createTierArray().indexOf(item.curTier) > 2 && createTierArray().indexOf(item.curTier) <= 6,
      ).length,
      pro: architects.filter(
         item => createTierArray().indexOf(item.curTier) > 6 && createTierArray().indexOf(item.curTier) <= 7,
      ).length,
      gyeruik: architects.filter(
         item => createTierArray().indexOf(item.curTier) > 7 && createTierArray().indexOf(item.curTier) <= 9,
      ).length,
      noob: architects.filter(
         item => createTierArray().indexOf(item.curTier) > 9 && createTierArray().indexOf(item.curTier) <= 13,
      ).length,
      unranked: architects.filter(item => createTierArray().indexOf(item.curTier) > 13).length,
   };
};

//

/** 건축가의 현재 티어  */
export const currentTier = (architect: Architect) => {
   return architect.curTier;
};

/** 해당하는 라인의 참여 횟수 */
export const numberParticipationInLine = (architect: Architect, line: Line) => {
   return architect.portfolio.noobProHacker.filter(item => item.line === line).length.toString();
};

/**  */
export const convertLineTierToTier = (req: string) => {
   if (req === 'hacker') return createTierArray().slice(0, 3);
   else if (req === 'gukbap') return createTierArray().slice(3, 7);
   else if (req === 'pro') return createTierArray().slice(7, 8);
   else if (req === 'gyeruik') return createTierArray().slice(8, 10);
   else if (req === 'noob') return createTierArray().slice(10, 14);
   else return createTierArray().slice(14);
};

/** 눕프핵 정보를 건축가 정보로 변환하는 함수 */
export const convertToArchitect = (req: { body: NoobProHacker }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach(line => {
      for (const key in line.line_details) {
         const portfolioInfo: Architect['portfolio']['noobProHacker'][0] = {
            episode: contentInfo.episode,
            subject: line.subject,
            line: key as Line,
            image_url: line.line_details[key as Line].image_url,
            youtube_url: line.line_details[key as Line].youtube_url,
            ranking: line.line_details[key as Line].ranking,
            date: new Date(contentInfo.date),
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

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'noobProHacker'>;
};
