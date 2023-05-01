import { useQueryNoobProHackerImages } from '@/services/awsAdapters';
import Image from 'next/image';
import styled from 'styled-components';

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

export default function ImageList({ page }: { page: number }) {
   const { data } = useQueryNoobProHackerImages(page);

   if (!data) return <div>로딩중</div>;

   return (
      <List>
         {data.map((item, index) => (
            <Item key={item}>
               <Image fill alt="noobProHacker img" src={`https://wakcraft.s3.ap-northeast-2.amazonaws.com/${item}`} />
            </Item>
         ))}
      </List>
   );
}
