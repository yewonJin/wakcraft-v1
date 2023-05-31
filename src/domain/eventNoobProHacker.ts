type Ranking = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type EventNoobProHacker = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   lineInfo: {
      subject: string;
      youtube_url: string;
      line_ranking: Ranking;
      line_details: {
         line: string;
         minecraft_id: string[];
         image_url: string;
         youtube_url: string;
         ranking: Ranking;
      }[];
   }[];
};

export const createEventNoobProHackerObject = (): EventNoobProHacker => {
   return {
      contentInfo: {
         contentName: '',
         episode: 0,
         date: '',
         youtube_url: '',
      },
      lineInfo: [
         {
            subject: '',
            youtube_url: '',
            line_ranking: 0,
            line_details: [
               {
                  line: '',
                  minecraft_id: [''],
                  image_url: '',
                  youtube_url: '',
                  ranking: 0,
               },
            ],
         },
      ],
   };
};

export const getLineWinnerSubject = (arr: EventNoobProHacker) => {
   return arr.lineInfo.filter(line => line.line_ranking === 1)[0].subject;
};

