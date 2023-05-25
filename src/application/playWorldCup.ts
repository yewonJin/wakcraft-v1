import { useState, useEffect } from 'react';

import { WorldCupItem, convertToWorldCupArray, useQueryWorldCup } from '@/services/worldCupAdapters';

export const usePlayWorldCup = () => {
   const data = useQueryWorldCup();

   const [page, setPage] = useState(0);
   const [round, setRound] = useState(128);
   const [isOriginal, setIsOriginal] = useState(false);

   const [curRound, setCurRound] = useState(0);
   const [clickedNumber, setClickedNumber] = useState(-1);

   const [curRoundArr, setCurRoundArr] = useState<WorldCupItem[]>([]);
   const [nextRoundArr, setNextRoundArr] = useState<WorldCupItem[]>([]);

   const [leftState, setLeftState] = useState(false);
   const [rightState, setRightState] = useState(false);

   useEffect(() => {
      initializeFirstRound();
   }, [data, round]);

   const handleImageClick = (item: WorldCupItem, index: number) => {
      checkLastRound(item);

      initializeNextRound(item);

      if (initializeNextRound(item) === 'exit') return;

      setLeftState(false);
      setRightState(false);

      setItemToNextRound(item, index);
   };

   const handleYoutubeClick = (index: number) => {
      if (index % 2 === 0) {
         if (leftState) {
            setLeftState(false);
         } else {
            setLeftState(true);
         }
      } else {
         setRightState(prev => !prev);
         if (rightState) {
            setRightState(false);
         } else {
            setRightState(true);
         }
      }
   };

   const initializeFirstRound = () => {
      if (!data) return;

      setCurRoundArr(
         convertToWorldCupArray(data)
            .reverse()
            .sort((a, b) => b.episode - a.episode)
            .slice(0, round)
            .sort(() => Math.random() - 0.5),
      );
   };

   const checkLastRound = (item: WorldCupItem) => {
      if (curRoundArr.length === 2) {
         setNextRoundArr([...nextRoundArr, item]);

         console.log('우승');
      }
   };

   const initializeNextRound = (item: WorldCupItem) => {
      if (curRound * 2 >= curRoundArr.length - 2) {
         setCurRoundArr([...nextRoundArr, item].sort(() => Math.random() - 0.5));

         setNextRoundArr([]);
         setCurRound(0);

         return 'exit';
      }
   };

   const setItemToNextRound = (item: WorldCupItem, index: number) => {
      setNextRoundArr([...nextRoundArr, item]);

      setClickedNumber(index);

      setTimeout(() => {
         setClickedNumber(-1);
      }, 300);

      setTimeout(() => {
         setCurRound(prev => prev + 1);
      }, 500);
   };

   return {
      data,
      page,
      round,
      setRound,
      setPage,
      setCurRound,
      isOriginal,
      setIsOriginal,
      curRound,
      clickedNumber,
      curRoundArr,
      nextRoundArr,
      handleImageClick,
      handleYoutubeClick,
      initializeFirstRound,
      leftState,
      rightState,
   };
};

export const getVideoId = (url: string) => {
   return url.split('/')[3].split('?')[0];
};

export const getStartTime = (url: string) => {
   return url.split('=')[1];
};
