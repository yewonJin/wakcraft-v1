import { NoobProHacker } from './noobProHacker';

export type Worldcup = {
   subject: 'HackerWorldCup';
   workInfo: {
      minecraft_id: string;
      episode: number;
      subject: string;
      image_url: string;
      youtube_url: string;
   };
   numberOfWin: number;
   numberOfParticipation: number;
};

export const convertToWorldcup = (arr: NoobProHacker[]): Worldcup[] => {
   const worldcupArr: Worldcup[] = [];

   arr.forEach(item => {
      item.lineInfo.forEach(line => {
         const worldcupItem: Worldcup = {
            subject: 'HackerWorldCup',
            workInfo: {
               minecraft_id: line.line_details.hacker.minecraft_id,
               episode: item.contentInfo.episode,
               subject: line.subject,
               image_url: line.line_details.hacker.image_url,
               youtube_url: line.line_details.hacker.youtube_url,
            },
            numberOfWin: 0,
            numberOfParticipation: 0,
         };

         worldcupArr.push(worldcupItem);
      });
   });

   return worldcupArr;
};
