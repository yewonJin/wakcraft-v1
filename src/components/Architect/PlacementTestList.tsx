import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';

const Layout = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const ContentBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

export default function PlacementTestList({ info }: { info: Architect }) {
   return (
      <Layout>
         {info.portfolio.placementTest
            .sort((a, b) => a.season - b.season)
            .map((item, index) => {
               return (
                  <ContentBox key={'placementTest_' + index}>
                     <ImageBox image_url={item.image_url} />
                     <InfoBox topText={`제 ${item.season}회 배치고사`} bottomText={item.placement_result} />
                  </ContentBox>
               );
            })}
      </Layout>
   );
}
