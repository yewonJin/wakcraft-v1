export type ArchitectureContest = {
   contentInfo: {
      subject: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   lineInfo: {
      line: string;
      youtube_url: string;
      line_details: {
         topText: string;
         bottomText: string;
         minecraft_id: string;
         image_url: string;
         youtube_url: string;
         ranking: number;
      }[];
   }[];
};

export const createArchitectureContestObject = (): ArchitectureContest => {
   return {
      contentInfo: {
         subject: '',
         episode: 0,
         date: '',
         youtube_url: '',
      },
      lineInfo: new Array(7).fill({
         line: '',
         youtube_url: '',
         line_details: new Array(7).fill({
            topText: '',
            bottomText: '',
            minecraft_id: '',
            image_url: '',
            youtube_url: '',
            ranking: 0,
         }),
      }),
   };
};
