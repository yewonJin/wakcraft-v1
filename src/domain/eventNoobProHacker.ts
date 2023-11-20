import { Architect } from './architect';

export type EventNoobProHacker = {
   contentInfo: {
      contentName: string;
      episode: number;
      date: string;
      youtube_url: string;
      isInFiniteTime: boolean;
   };
   lineInfo: {
      subject: string;
      youtube_url: string;
      line_ranking: number;
      line_details: {
         line: string;
         minecraft_id: string[];
         image_url: string;
         youtube_url: string;
         ranking: number;
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
         isInFiniteTime: false,
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

export const getMinecraftIdText = (arr: EventNoobProHacker['lineInfo'][0]['line_details'][0]) => {
   if (arr.line.includes('x')) return arr.line.split('x').join(' x ');
   else return arr.line + ' x ' + arr.minecraft_id.length;
};

export const isInfiniteTimeContent = (episode: number) => {
   const arr = [1, 4, 6];

   if (arr.includes(episode)) return true;

   return false;
};

export const getNumberOfPeople = (item: Architect['portfolio']['eventNoobProHacker'][0]) => {
   if (item.episode === 3 && item.line === '프로') return 2;

   if (item.episode === 3 && item.line === '눕') return 10;

   const numberOfPeople = item.line?.split('x')[1];

   if (!numberOfPeople) return 1;

   if (item.episode === 5 && numberOfPeople) return parseInt(numberOfPeople);

   return 1;
};
