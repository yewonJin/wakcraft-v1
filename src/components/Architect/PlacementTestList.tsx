import Image from 'next/image';
import styled from 'styled-components';

import TextBox from '../Common/TextBox';
import { Architect } from '@/domain/architect';

const Layout = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;
`;

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const ImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
   box-shadow: 1px 1px 3px #333;
   border-radius: 10px;
   background-color: #ddd;

   :hover {
      cursor: pointer;
   }

   :hover > img {
      filter: brightness(0.9);
   }

   > img {
      border-radius: 10px;
   }
`;

const ContentBox = styled.div`
   display: flex;
   gap: 10px;
   justify-content: center;
   min-width: 170px;
   padding: 0px 25px;
`;

export default function PlacementTestList({ info }: { info: Architect }) {
   return (
      <Layout>
         {info.portfolio.placementTest
            .sort((a, b) => a.season - b.season)
            .map((item, index) => {
               return (
                  <PortFolioBox key={'placementTest_' + index}>
                     <ImageBox onClick={() => window.open(item.image_url)}>
                        <Image fill sizes="400px" alt="noobProHacker image" src={item.image_url} />
                     </ImageBox>
                     <ContentBox>
                        <TextBox
                           text={`제 ${item.season}회 배치고사`}
                           fontSize="16px"
                           lineHeight="24px"
                           color="#646464"
                        />
                        <TextBox text={item.placement_result} fontSize="18px" lineHeight="24px" fontWeight="500" />
                     </ContentBox>
                  </PortFolioBox>
               );
            })}
      </Layout>
   );
}
