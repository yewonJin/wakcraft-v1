import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';
import RankingBox from '../Common/ContentDetail/RankingBox';
import { isInfiniteTimeContent } from '@/domain/eventNoobProHacker';

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

export default function EventNoobProHackerItem({
   item,
   index,
}: {
   item: Architect['portfolio']['eventNoobProHacker'][0];
   index: number;
}) {
   return (
      <PortFolioBox>
         <ImageBox
            image_url={item.image_url}
            youtube_url={item.youtube_url}
            date={new Date(item.date)}
            isInfiniteTime={item.contentName !== '치즐 건콘 - 기술편' ? isInfiniteTimeContent(item.episode) : false}
         />
         <ContentBox>
            <TierBox tier={item.line}>{item.line}</TierBox>
            <InfoBox topText={`${item.contentName}`} bottomText={item.subject} />
            <RankingBox tier={item.line} ranking={item.ranking} />
         </ContentBox>
      </PortFolioBox>
   );
}
