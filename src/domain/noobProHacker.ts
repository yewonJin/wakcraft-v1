type Ranking = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type NoobProHacker = {
   contentInfo: {
      episode: number;
      main_subject: string;
      date: string;
      youtube_url: string;
   };
   lineInfo: {
      subject: string;
      youtube_url: string;
      line_ranking: Ranking;
      line_details: {
         noob: { minecraft_id: string; image_url: string; youtube_url: string; ranking: Ranking };
         pro: { minecraft_id: string; image_url: string; youtube_url: string; ranking: Ranking };
         hacker: { minecraft_id: string; image_url: string; youtube_url: string; ranking: Ranking };
      };
   }[];
};

export const createNoobProHackerObject = (): NoobProHacker => {
   return {
      contentInfo: {
         episode: 0,
         main_subject: '',
         date: '',
         youtube_url: 'null',
      },
      lineInfo: [
         {
            subject: '',
            youtube_url: 'null',
            line_ranking: 0,
            line_details: {
               noob: {
                  minecraft_id: '',
                  youtube_url: 'null',
                  image_url: '',
                  ranking: 0,
               },
               pro: {
                  minecraft_id: '',
                  youtube_url: 'null',
                  image_url: '',
                  ranking: 0,
               },
               hacker: {
                  minecraft_id: '',
                  youtube_url: 'null',
                  image_url: '',
                  ranking: 0,
               },
            },
         },
      ],
   };
};

/** 라인 랭킹 1위의 인덱스 반환하는 함수 */
export const lineWinnerIndex = (content: NoobProHacker) => {
   return content.lineInfo.findIndex(item => item.line_ranking == 1);
};

export const getLineWinnerSubject = (arr: NoobProHacker) => {
   return arr.lineInfo.filter(line => line.line_ranking === 1)[0]?.subject ?? '없음';
};

export const getWinnerId = (arr: NoobProHacker, tier: 'pro' | 'hacker') => {
   return arr.lineInfo.filter(line => line.line_details[tier].ranking === 1)[0].line_details[tier].minecraft_id;
};

/** 눕프핵 정보를 싹슬이 라인 정보로 변환하는 함수 */
export const convertToSweepLine = (arr: NoobProHacker[]): SweepLine[] => {
   const sweepLineArr: SweepLine[] = [];

   arr.forEach(item => {
      const winnerLine = item.lineInfo.filter(line => line.line_ranking === 1)[0];

      sweepLineArr.push({
         episode: item.contentInfo.episode,
         line_details: winnerLine.line_details,
         line_ranking: winnerLine.line_ranking,
         subject: winnerLine.subject,
         youtube_url: winnerLine.youtube_url,
      });
   });

   return sweepLineArr;
};

type SweepLine = {
   episode: number;
   line_details: NoobProHacker['lineInfo'][0]['line_details'];
   line_ranking: number;
   subject: string;
   youtube_url: string;
};

/** 눕프핵 정보를 최근 3회 프로, 해커 정보로 바꾸기 */
export const convertToRecentWin = (arr: NoobProHacker[]) => {
   const recentWinArr: RecentWin[] = [];

   arr.forEach(item => {
      item.lineInfo.forEach(item2 => {
         if (item2.line_details.pro.ranking === 1) {
            recentWinArr.push({
               episode: item.contentInfo.episode,
               subject: item2.subject,
               line: item2.line_details.pro,
               priority: 0,
            });
         }

         if (item2.line_details.hacker.ranking === 1) {
            recentWinArr.push({
               episode: item.contentInfo.episode,
               subject: item2.subject,
               line: item2.line_details.hacker,
               priority: 1,
            });
         }
      });
   });

   return recentWinArr.sort((a, b) => b.priority - a.priority).sort((a, b) => b.episode - a.episode);
};

type RecentWin = {
   episode: number;
   subject: string;
   line: NoobProHacker['lineInfo'][0]['line_details']['pro'];
   priority: number;
};

export const renameToWebp = (imageUrl: string) => {
   const splitName = imageUrl.split('.');

   return `${splitName.slice(0, splitName.length - 1).join('.')}.webp`;
};

export const renameTo1080Webp = (imageUrl: string) => {
   const splitName = imageUrl.split('.');

   return `${splitName.slice(0, splitName.length - 1).join('.')}.1080p.webp`;
};
