import { useState, useEffect } from 'react';
import YoutubePlayer from 'react-youtube';

import { WorldCupItem, convertToWorldCupArray, useQueryWorldCup } from '@/services/worldCupAdapters';

interface BetterYoutubePlayer extends YoutubePlayer {
   pauseVideo: () => void;
   playVideo: () => void;
}

export const usePlayWorldCup = () => {
   const data = useQueryWorldCup();

   const [page, setPage] = useState(0);
   const [round, setRound] = useState(128);
   const [isOriginal, setIsOriginal] = useState(false);

   const [curRound, setCurRound] = useState(0);
   const [clickedNumber, setClickedNumber] = useState(-1);

   const [curRoundArr, setCurRoundArr] = useState<WorldCupItem[]>([]);
   const [nextRoundArr, setNextRoundArr] = useState<WorldCupItem[]>([]);

   const [leftPlayer, setLeftPlayer] = useState<BetterYoutubePlayer>();
   const [leftState, setLeftState] = useState(false);

   const [rightPlayer, setRightPlayer] = useState<BetterYoutubePlayer>();
   const [rightState, setRightState] = useState(false);

   useEffect(() => {
      initializeFirstRound();
   }, [data, round]);

   const onReadyPlayer = (target: YoutubePlayer, index: number) => {
      if (index === 0) setLeftPlayer(target as BetterYoutubePlayer);
      else if (index === 1) setRightPlayer(target as BetterYoutubePlayer);
   };

   const handleImageClick = (item: WorldCupItem, index: number) => {
      checkLastRound(item);

      initializeNextRound(item);

      if (initializeNextRound(item) === 'exit') return;

      setItemToNextRound(item, index);
   };

   const handleYoutubeClick = (index: number) => {
      if (!leftPlayer || !rightPlayer) return;

      if (index === 0) {
         setLeftState(prev => !prev);

         if (leftState) {
            leftPlayer.pauseVideo();
         } else {
            leftPlayer.playVideo();
         }
      } else {
         setRightState(prev => !prev);
         if (rightState) {
            rightPlayer.pauseVideo();
         } else {
            rightPlayer.playVideo();
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
      onReadyPlayer,
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
