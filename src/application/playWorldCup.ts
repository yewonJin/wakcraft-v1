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
   const [clickedNumber, setClickedNumber] = useState(-1);

   const [curRound, setCurRound] = useState<WorldCupItem[]>([]);
   const [nextRound, setNextRound] = useState<WorldCupItem[]>([]);

   const [leftPlayer, setLeftPlayer] = useState<BetterYoutubePlayer>();
   const [leftState, setLeftState] = useState(false);

   const [rightPlayer, setRightPlayer] = useState<BetterYoutubePlayer>();
   const [rightState, setRightState] = useState(false);

   // 128강으로 만들려면 slice()랑 sort() 위치 바꿔야함
   useEffect(() => {
      initializeFirstRound();
   }, [data]);

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

      setCurRound(
         convertToWorldCupArray(data)
            .reverse()
            .sort(() => Math.random() - 0.5)
            .slice(0, 16),
      );
   };

   const checkLastRound = (item: WorldCupItem) => {
      if (curRound.length === 2) {
         setNextRound([...nextRound, item]);

         console.log('우승');
      }
   };

   const initializeNextRound = (item: WorldCupItem) => {
      if (page * 2 >= curRound.length - 2) {
         setCurRound([...nextRound, item].sort(() => Math.random() - 0.5));

         setNextRound([]);
         setPage(0);

         return 'exit';
      }
   };

   const setItemToNextRound = (item: WorldCupItem, index: number) => {
      setNextRound([...nextRound, item]);

      setClickedNumber(index);

      setTimeout(() => {
         setClickedNumber(-1);
      }, 500);

      setTimeout(() => {
         setPage(prev => prev + 1);
      }, 700);
   };

   return {
      data,
      page,
      clickedNumber,
      onReadyPlayer,
      curRound,
      nextRound,
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
