import { NoobProHacker } from './noobProHacker';

export type Game = 'HackerWorldCup';

export type Worldcup = {
   game: Game;
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

export const convertAllNoobProHackerToWorldcup = (arr: NoobProHacker[]): Worldcup[] => {
   const worldcupArr: Worldcup[] = [];

   arr.forEach(item => {
      item.lineInfo.forEach(line => {
         const worldcupItem: Worldcup = {
            game: 'HackerWorldCup',
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

export const convertToWorldcup = (noobProHacker: NoobProHacker): Worldcup[] => {
   const worldcupArr: Worldcup[] = [];

   noobProHacker.lineInfo.forEach(line => {
      const worldcupItem: Worldcup = {
         game: 'HackerWorldCup',
         workInfo: {
            minecraft_id: line.line_details.hacker.minecraft_id,
            episode: noobProHacker.contentInfo.episode,
            subject: line.subject,
            image_url: line.line_details.hacker.image_url,
            youtube_url: line.line_details.hacker.youtube_url,
         },
         numberOfWin: 0,
         numberOfParticipation: 0,
      };

      worldcupArr.push(worldcupItem);
   });

   return worldcupArr;
};

export const getWinRatio = (item: Worldcup) => {
   const { numberOfWin, numberOfParticipation } = item;

   return numberOfParticipation === 0 ? '??%' : ((numberOfWin * 100) / numberOfParticipation).toFixed(2) + '%';
};

export function shuffle(array: Worldcup[]) {
   let currentIndex = array.length,
      randomIndex;

   // While there remain elements to shuffle.
   while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
   }

   return array;
}
