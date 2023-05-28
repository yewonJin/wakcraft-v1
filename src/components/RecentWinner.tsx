import styled from 'styled-components';
import Image from 'next/image';

import TextBox from './Common/TextBox';
import ImageInfo from './Common/ImageInfo';
import { useQueryNoobProHackerRecentWinLine } from '@/services/noobProHackerAdapters';
import { convertToRecentWin, renameTo1080Webp } from '@/domain/noobProHacker';

const Layout = styled.div`
   width: 1200px;
   margin: 0px auto;
   height: 1400px;
   margin-top: 120px;
`;

const ContentLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   gap: 15px;
`;

const ContentBox = styled.div<{ index: number; priority: number }>`
   position: relative;
   height: 400px;
   grid-column: ${props => (props.priority == 0 ? 'span 2' : 'span 3')};
   order: ${props => props.index};
   order: ${props => (props.index == 2 ? '3' : props.index == 3 ? '2' : '')};

   > img {
      border-radius: 20px;
   }
`;

export default function RecentWinner() {
   const data = useQueryNoobProHackerRecentWinLine();

   if (!data) return <div>loading</div>;

   return (
      <Layout>
         <TextBox
            text={'최근 우승 작품'}
            fontSize="26px"
            lineHeight="40px"
            fontWeight="500"
            margin="0px 0px 30px 0px"
         />
         <ContentLayout>
            {convertToRecentWin(data).map((item, index) => {
               return (
                  <ContentBox index={index} priority={item.priority} key={item.episode + item.line.minecraft_id}>
                     <Image
                        alt="image"
                        fill
                        src={renameTo1080Webp(item.line.image_url)}
                        style={{ objectFit: 'cover' }}
                     />
                     <ImageInfo
                        episode={item.episode}
                        subject={item.subject}
                        minecraft_id={item.line.minecraft_id}
                        onClick={() => console.log('hi')}
                     />
                  </ContentBox>
               );
            })}
         </ContentLayout>
      </Layout>
   );
}
