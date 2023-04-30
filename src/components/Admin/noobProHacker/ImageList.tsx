import Image from 'next/image';
import { UseQueryResult, useQuery } from 'react-query';
import styled from 'styled-components';

const List = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.li`
   position: relative;
   aspect-ratio: 16/9;
`;

export default function ImageList({ page }: { page: number }) {
   const { data }: UseQueryResult<string[]> = useQuery(
      ['getNoobProHackerImages', page],
      () => fetch(`/api/aws?episode=${page}`).then(res => res.json()),
      {
         refetchOnWindowFocus: false,
      },
   );

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
