type Ranking = 0 | 1 | 2 | 3 | 4 | 5;

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
         youtube_url: '',
      },
      lineInfo: [
         {
            subject: '',
            youtube_url: '',
            line_ranking: 0,
            line_details: {
               noob: {
                  minecraft_id: '',
                  youtube_url: '',
                  image_url: '',
                  ranking: 0,
               },
               pro: {
                  minecraft_id: '',
                  youtube_url: '',
                  image_url: '',
                  ranking: 0,
               },
               hacker: {
                  minecraft_id: '',
                  youtube_url: '',
                  image_url: '',
                  ranking: 0,
               },
            },
         },
      ],
   };
};
