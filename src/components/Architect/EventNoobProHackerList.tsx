import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';
import RankingBox from '../Common/ContentDetail/RankingBox';
import { getNumberOfPeople, isInfiniteTimeContent } from '@/domain/eventNoobProHacker';

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

const TierBox = styled.span<{ tier: string }>`
   display: flex;
   justify-content: center;
   align-items: center;
   width: ${props => (props.tier === '' ? '60px' : '90px')};
   height: 53px;
   border-radius: 10px;
   font-size: 16px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: ${props => (props.tier === '' ? 'rgb(255, 255, 255)' : 'rgb(65, 65, 65)')};
`;

export default function EventNoobProHackerList({ info }: { info: Architect }) {
   return (
      <Layout>
         {info.portfolio.eventNoobProHacker.map((item, index) => {
            return (
               <PortFolioBox key={'eventNoobProHacker_' + index}>
                  <ImageBox
                     image_url={item.image_url}
                     youtube_url={item.youtube_url}
                     isInfiniteTime={isInfiniteTimeContent(item.episode)}
                     numberOfPeople={getNumberOfPeople(item)}
                  />
                  <ContentBox>
                     {item.line ? <TierBox tier={item.line}>{item.line}</TierBox> : ''}
                     <InfoBox topText={`${item.contentName}`} bottomText={item.subject} />
                     {item.line && <RankingBox tier={item.line} ranking={item.ranking} />}
                  </ContentBox>
               </PortFolioBox>
            );
         })}
      </Layout>
   );
}
