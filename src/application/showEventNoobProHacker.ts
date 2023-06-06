import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { useQueryEventNoobProHacker } from '@/services/eventNoobProHackerAdapters';
import { produce } from 'immer';
import { useState, useEffect } from 'react';

export const useShowEventNoobProHacker = () => {
   const data = useQueryEventNoobProHacker();

   const [linePage, setLinePage] = useState<number[]>(new Array(5).fill(0));
   const [modalState, setModalState] = useState(Array.from(Array(4), () => Array(4).fill(false)));

   useEffect(() => {
      if (!data) return;

      setModalState(
         Array.from(Array(data.lineInfo.length ?? 3), () =>
            Array(data.lineInfo[0].line_details.length ?? 3).fill(false),
         ),
      );

      setLinePage(new Array(data.lineInfo.length).fill(0));
   }, [data]);

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

   return { data, linePage, modalState, increasePage, decreasePage, toggleModal };
};

const getLastPage = (data: EventNoobProHacker) => {
   return data.lineInfo[0].line_details.length;
};
