import { produce } from 'immer';
import { useEffect, useState } from 'react';

import { useQueryEventNoobProHacker } from '@/services/eventNoobProHackerAdapters';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';

export const useShowEventNoobProHacker = () => {
   const data = useQueryEventNoobProHacker();

   const [linePage, setLinePage] = useState<number[]>(new Array(5).fill(0));   
   const [modalState, setModalState] = useState(Array.from(Array(7), () => Array(5).fill(false)));

   useEffect(() => {
      if (!data) return;

      initialize(data);
   }, [data]);

   const initialize = (data: EventNoobProHacker) => {
      setLinePage(new Array(data.lineInfo[0].line_details.length).fill(0));
   };

   const toggleModal = (lineIndex: number, tierIndex: number) => {
      setModalState(prev =>
         produce(prev, draft => {
            draft[lineIndex][tierIndex] = !draft[lineIndex][tierIndex];
         }),
      );
   };

   const increasePage = (index: number) => {
      setLinePage(prev =>
         produce(prev, draft => {
            draft[index] = draft[index] - 1;
         }),
      );
   };

   const decreasePage = (index: number) => {
      if (linePage[index] === -2) return;

      setLinePage(prev =>
         produce(prev, draft => {
            draft[index] = draft[index] + 1;
         }),
      );
   };

   return { data, linePage, modalState, increasePage, decreasePage, toggleModal, initialize };
};
