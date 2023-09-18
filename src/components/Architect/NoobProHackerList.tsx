import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import TierBox from '../Common/ContentDetail/TierBox';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';
import RankingBox from '../Common/ContentDetail/RankingBox';

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

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const ContentBox = styled.div`
   display: flex;
   justify-content: space-between;
`;

export default function NoobProHackerList({ info }: { info: Architect }) {

   return (
      <Layout>
         {info.portfolio.noobProHacker.map((item, index) => {
            return (
               <PortFolioBox key={'noobProHacker_' + index}>
                  <ImageBox image_url={item.image_url} youtube_url={item.youtube_url} />
                  <ContentBox>
                     <TierBox tier={item.line} />
                     <InfoBox topText={`제 ${item.episode}회 눕프핵`} bottomText={item.subject} />
                     <RankingBox tier={item.line} ranking={item.ranking} />
                  </ContentBox>
               </PortFolioBox>
            );
         })}
      </Layout>
   );
}
