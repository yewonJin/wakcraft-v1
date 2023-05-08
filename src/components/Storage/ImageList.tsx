import { useQueryAwsImages } from '@/services/awsAdapters';
import Image from 'next/image';
import styled from 'styled-components';

import { useAwsStorage } from '@/application/accessAwsStorage';
import { Button } from '../Common/Button';

const List = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(2, 1fr);
   margin-top: 10px;
`;

const Item = styled.li`
   list-style: none;
   position: relative;
   aspect-ratio: 16/9;
`;

export default function ImageList({ content }: { content: 'noobProHacker' | 'placementTest' }) {
   const { page, handleNoobProHackerImageClick, handlePlacementTestImageClick, setAllImagesToPlacementTest } =
      useAwsStorage();

   const { data } = useQueryAwsImages(content, page);

   if (!data) return <div>로딩중</div>;

   return (
      <>
         {content === 'placementTest' && (
            <Button
               text="모든 이미지 추가하기"
               fontSize="14px"
               padding="8px 12px"
               onClick={() => setAllImagesToPlacementTest(data)}
            />
         )}
         <List>
            {data.map(item => (
               <Item
                  key={item}
                  onClick={() => {
                     if (content === 'noobProHacker') {
                        handleNoobProHackerImageClick(item);
                        return;
                     } else if (content === 'placementTest') {
                        handlePlacementTestImageClick(item);
                        return;
                     }
                  }}
               >
                  <Image
                     fill
                     sizes="400px"
                     alt="noobProHacker img"
                     src={`https://wakcraft.s3.ap-northeast-2.amazonaws.com/${item}`}
                  />
               </Item>
            ))}
         </List>
      </>
   );
}
