import { useQueryEventNoobProHacker } from '@/services/eventNoobProHackerAdapters';
import { produce } from 'immer';
import { useState, useEffect } from 'react';

export const useShowEventNoobProHacker = () => {
   const data = useQueryEventNoobProHacker();

   const [modalState, setModalState] = useState(Array.from(Array(4), () => Array(4).fill(false)));

   useEffect(() => {
      setModalState(
         Array.from(Array(data?.lineInfo.length ?? 3), () =>
            Array(data?.lineInfo[0].line_details.length ?? 3).fill(false),
         ),
      );
   }, [data]);

   const toggleModal = (lineIndex: number, tierIndex: number) => {
      setModalState(prev =>
         produce(prev, draft => {
            draft[lineIndex][tierIndex] = !draft[lineIndex][tierIndex];
         }),
      );
   };

   return { data, modalState, toggleModal };
};
