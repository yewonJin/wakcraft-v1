type LineInfo = {
   minecraft_id: string;
   image_url: string;
   youtube_url: string;
   ranking: number;
};

export type NoobProHacker = {
   episode: string;
   date: Date;
   lines: {
      subject: string;
      youtube_url: string;
      line_ranking: number;
      line_details: {
         noob: LineInfo;
         pro: LineInfo;
         hacker: LineInfo;
      };
   }[];
};
