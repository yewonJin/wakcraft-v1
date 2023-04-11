type Line = '눕' | '계륵' | '프로' | '국밥' | '해커';

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
   | '안 나쁜 눕'
   | '그냥 눕'
   | '진짜 눕'
   | '언랭';

export type Architect = {
   minecraft_id: string;
   wakzoo_id: string;
   tier: Tier[];
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
         subject: string;
         image_url: string;
         placement_result: Tier;
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

/** 눕프핵 참가 횟수 */
export const participationCount = (architect: Architect) => {
   const { portfolio } = architect;

   return portfolio.noobProHacker.length;
};

/** 눕프핵 우승 횟수 */
export const winnerCount = (architect: Architect) => {
   const { portfolio } = architect;

   return portfolio.noobProHacker.filter(item => item.ranking == 1).length;
};

/** 티어 분류 */
export const classifyTier = (architect: Architect) => {
   const index = createTierArray().indexOf(architect.tier[0]);

   if (index < 4) return 'hacker';
   else if (index < 7) return 'gukbap';
   else if (index < 8) return 'pro';
   else if (index < 10) return 'gyeruik';
   else return 'noob';
};
