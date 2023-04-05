export const translateTier = (tier: string) => {
   switch (tier) {
      case 'noob':
         return '눕';
      case 'pro':
         return '프로';
      case 'hacker':
         return '해커';
      default:
         return 'null';
   }
};

export const checkEmptyInDeepObject = (obj: object) => {
   var check = true;

   const recursiveFunction = (obj: object) => {
      Object.values(obj).map(item => {
         if (item === '') check = false;

         if (typeof item === 'object') {
            recursiveFunction(item);
         }
      });
   };

   recursiveFunction(obj);

   return check;
};
