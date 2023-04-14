const tier = [
   '마카게',
   '오마카세',
   '해커',
   '해장국',
   '국밥',
   '미지근한 국밥',
   '식은 국밥',
   '프로',
   '계추',
   '계륵',
   '착한 눕',
   '안 나쁜 눕',
   '그냥 눕',
   '진짜 눕',
   '언랭',
];

export const convertLineTierToTier = (req: string) => {
   if (req === 'hacker') return tier.slice(0, 4);
   else if (req === 'gukbap') return tier.slice(4, 7);
   else if (req === 'pro') return tier.slice(7, 8);
   else if (req === 'gyeruik') return tier.slice(8, 10);
   else return tier.slice(10);
};
