import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import ImageBox from '../Common/ContentDetail/ImageBox';
import InfoBox from '../Common/ContentDetail/InfoBox';

const ContentBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

export default function PlacementTestItem({
   item,
   index,
}: {
   item: Architect['portfolio']['placementTest'][0];
   index: number;
}) {
   return (
      <ContentBox key={'placementTest_' + index}>
         <ImageBox image_url={item.image_url} date={new Date(item.date)}/>
         <InfoBox topText={`제 ${item.season}회 배치고사`} bottomText={item.placement_result} />
      </ContentBox>
   );
}
