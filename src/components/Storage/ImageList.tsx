import { useQueryNoobProHackerImages } from '@/services/awsAdapters';
import Image from 'next/image';
import styled from 'styled-components';

import { NoobProHacker } from '@/domain/noobProHacker';
import { useAwsStorage } from '@/application/accessAwsStorage';

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

export default function ImageList() {
   const { page, handleImageClick } = useAwsStorage();

   const { data } = useQueryNoobProHackerImages(page);

   if (!data) return <div>로딩중</div>;

   return (
      <List>
         {data.map((item, index) => (
            <Item key={item} onClick={e => handleImageClick(item)}>
               <Image fill alt="noobProHacker img" src={`https://wakcraft.s3.ap-northeast-2.amazonaws.com/${item}`} />
            </Item>
         ))}
      </List>
   );
}
