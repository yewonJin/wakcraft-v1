export type GuessTime = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
   };
   participants: {
      order: number;
      expectedTime: 2 | 4 | 6 | 8 | 10;
      time: 2 | 4 | 6 | 8 | 10;
      minecraft_id: string;
      image_url: string;
      youtube_url: string;
   }[];
};
