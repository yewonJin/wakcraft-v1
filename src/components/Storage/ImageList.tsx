import { useQueryNoobProHackerImages } from '@/services/awsAdapters';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Dispatch, SetStateAction } from 'react';

import { curLineIndexState, curLineState, lineInfoState } from '@/services/store/noobProHacker';
import { NoobProHacker } from '@/domain/noobProHacker';
import { storageState } from '@/services/store/storage';

const List = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(2, 1fr);
`;

const Item = styled.li`
   list-style: none;
   position: relative;
   aspect-ratio: 16/9;
`;

const replaceItemAtIndex = (arr: NoobProHacker['lineInfo'], index: number, newValue: NoobProHacker['lineInfo'][0]) => {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export default function ImageList({ page, setPage }: { page: number; setPage: Dispatch<SetStateAction<number>> }) {
   const { data } = useQueryNoobProHackerImages(page);
   const curLine = useRecoilValue(curLineState);
   const curLineIndex = useRecoilValue(curLineIndexState);
   const [lineInfo, setLineInfo] = useRecoilState(lineInfoState);
   const [viewStorage, setViewStorage] = useRecoilState(storageState);

   if (!data) return <div>로딩중</div>;

   const handleClick = (name: string) => {
      const newValue = {
         ...lineInfo[curLineIndex],
         line_details: {
            ...lineInfo[curLineIndex].line_details,
            [curLine]: {
               ...lineInfo[curLineIndex].line_details[curLine],
               image_url: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${name}`,
            },
         },
      };

      const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);
      setLineInfo(newArr);
      setPage(0);
      setViewStorage(false);
   };

   return (
      <List>
         {data.map((item, index) => (
            <Item key={item} onClick={e => handleClick(item)}>
               <Image fill alt="noobProHacker img" src={`https://wakcraft.s3.ap-northeast-2.amazonaws.com/${item}`} />
            </Item>
         ))}
      </List>
   );
}
