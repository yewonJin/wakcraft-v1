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
      }[];
      placementTest: {
         season: number;
         image_url: string;
         placement_result: Tier;
      }[];
      eventNoobProHacker: {
         contentName: string,
         episode: number;
         subject: string;
         line: string;
         image_url: string;
         youtube_url: string;
         ranking: number;
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

/** 건축가의 현재 티어  */
export const currentTier = (architect: Architect) => {
   const { tier } = architect;

   return tier[tier.length - 1];
};

/** 해당하는 라인의 참여 횟수 */
export const numberParticipationInLine = (architect: Architect, line: Line) => {
   return architect.portfolio.noobProHacker.filter(item => item.line === line).length.toString();
};
