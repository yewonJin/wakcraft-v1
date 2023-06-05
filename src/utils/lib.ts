import { Tier, createTierArray } from '@/domain/architect';

import noob from '../../public/assets/images/tier/noob.webp';
import gyeruik from '../../public/assets/images/tier/gyeruik.webp';
import pro from '../../public/assets/images/tier/pro.webp';
import gukbap from '../../public/assets/images/tier/gukbap.webp';
import hacker from '../../public/assets/images/tier/hacker.webp';
import hacker2 from '../../public/assets/images/tier/hacker2.webp';

export const translateTier = (tier: string) => {
   switch (tier) {
      case 'hacker':
         return '해커';
      case 'gukbap':
         return '국밥';
      case 'pro':
         return '프로';
      case 'gyeruik':
         return '계륵';
      case 'noob':
         return '눕';
      case 'unranked':
         return '언랭';
      default:
         return tier;
   }
};

export const tierImage = (tier: Tier) => {
   if (createTierArray().slice(0, 2).includes(tier)) return hacker2;
   else if (createTierArray().slice(2, 4).includes(tier)) return hacker;
   else if (createTierArray().slice(4, 7).includes(tier)) return gukbap;
   else if (createTierArray().slice(7, 9).includes(tier)) return pro;
   else if (createTierArray().slice(9, 12).includes(tier)) return gyeruik;
   else return noob;
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
