import { useState, useEffect } from 'react';

import { useQueryWorldCup } from '@/services/worldcupAdapters';
import { Worldcup } from '@/domain/worldcup';

export const usePlayWorldCup = () => {
   const data = useQueryWorldCup();

   const [page, setPage] = useState(0);
   const [roundOfNumber, setRoundOfNumber] = useState(128);

   const [curRoundArr, setCurRoundArr] = useState<Worldcup[]>([]);
   const [nextRoundArr, setNextRoundArr] = useState<Worldcup[]>([]);
   const [curRound, setCurRound] = useState(0);
   const [clickedNumber, setClickedNumber] = useState(-1);

   const [playing, setPlaying] = useState({
      leftPlayer: false,
      rightPlayer: false,
   });

   useEffect(() => {
      initializeFirstRound();
   }, [data, roundOfNumber]);

   function shuffle(array: Worldcup[]) {
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

   /** N강 설정하기  */
   const initializeFirstRound = () => {
      if (!data) return;

      setCurRoundArr(data.slice(0, roundOfNumber));
   };

   const preloadNextRound = (curRoundArr: Worldcup[]) => {
      return curRoundArr.filter((_, index) => index < (curRound + 1) * 4);
   };

   /** 월드컵 설정 알고리즘 */
   const handleImageClick = (item: Worldcup, index: number) => {
      if (isFinalRound) {
         setWinner(item);
         return;
      }

      if (isLastRound) {
         setNextRound(item);
         return;
      }

      pauseAllVideo();

      setItemToNextRound(item);

      clickAnimation(index);
   };

   const isFinalRound = curRoundArr.length === 2;

   const setWinner = (item: Worldcup) => {
      setCurRoundArr([...nextRoundArr, item]);

      console.log('우승');
   };

   const isLastRound = curRound * 2 >= curRoundArr.length - 2;

   const setNextRound = (item: Worldcup) => {
      setCurRoundArr(shuffle([...nextRoundArr, item]));

      setNextRoundArr([]);
      setCurRound(0);
   };

   const pauseAllVideo = () => {
      setPlaying({
         leftPlayer: false,
         rightPlayer: false,
      });
   };

   const setItemToNextRound = (item: Worldcup) => {
      setNextRoundArr([...nextRoundArr, item]);

      setTimeout(() => {
         setCurRound(prev => prev + 1);
      }, 500);
   };

   const clickAnimation = (index: number) => {
      setClickedNumber(index);

      setTimeout(() => {
         setClickedNumber(-1);
      }, 300);
   };

   /** 유튜브 아이콘 클릭하면 영상 재생 */
   const handleYoutubeClick = (index: number) => {
      if (index % 2 === 0) {
         if (playing.leftPlayer) {
            setPlaying(prev => ({ ...prev, leftPlayer: false }));
         } else {
            setPlaying(prev => ({ ...prev, leftPlayer: true }));
         }
      } else {
         if (playing.rightPlayer) {
            setPlaying(prev => ({ ...prev, rightPlayer: false }));
         } else {
            setPlaying(prev => ({ ...prev, rightPlayer: true }));
         }
      }
   };

   const isLoading = curRoundArr.length === 0;

   return {
      isLoading,
      data,
      page,
      roundOfNumber,
      setRoundOfNumber,
      setPage,
      setCurRound,
      curRound,
      clickedNumber,
      curRoundArr,
      nextRoundArr,
      handleImageClick,
      handleYoutubeClick,
      initializeFirstRound,
      playing,
      preloadNextRound,
   };
};

export const getVideoId = (url: string) => {
   return url.split('/')[3].split('?')[0];
};

export const getStartTime = (url: string) => {
   return url.split('=')[1];
};
