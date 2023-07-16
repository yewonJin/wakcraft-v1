import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import TierBox from '../Common/ContentDetail/TierBox';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';
import RankingBox from '../Common/ContentDetail/RankingBox';

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

export default function NoobProHackerItem({
   item,
   index,
}: {
   item: Architect['portfolio']['noobProHacker'][0];
   index: number;
}) {
   return (
      <PortFolioBox key={'noobProHacker_' + index}>
         <ImageBox image_url={item.image_url} youtube_url={item.youtube_url} date={new Date(item.date)} />
         <ContentBox>
            <TierBox tier={item.line} />
            <InfoBox topText={`제 ${item.episode}회 눕프핵`} bottomText={item.subject} />
            <RankingBox ranking={item.ranking} />
         </ContentBox>
      </PortFolioBox>
   );
}
