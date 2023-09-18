export type Content =
   | 'noobProHacker'
   | 'placementTest'
   | 'eventNoobProHacker'
   | 'architectureContest'
   | 'matchYourTier';

export const getContentName = (content: Content) => {
   switch (content) {
      case 'noobProHacker':
         return '눕프로해커';
      case 'placementTest':
         return '배치고사';
      case 'eventNoobProHacker':
         return '이벤트 눕프핵';
      case 'architectureContest':
         return '건축 콘테스트';
      case 'matchYourTier':
         return '티어 맞추기';
   }
};

export const isAddAllImagesContent = (content: Content) => {
   return content === 'placementTest' || content === 'matchYourTier' ? true : false;
};
