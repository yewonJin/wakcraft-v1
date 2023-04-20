import { createTierArray } from '@/domain/architect';

export const convertLineTierToTier = (req: string) => {
   if (req === 'hacker') return createTierArray().slice(0, 4);
   else if (req === 'gukbap') return createTierArray().slice(4, 7);
   else if (req === 'pro') return createTierArray().slice(7, 8);
   else if (req === 'gyeruik') return createTierArray().slice(8, 10);
   else return createTierArray().slice(10);
};