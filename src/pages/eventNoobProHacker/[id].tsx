import { Fragment } from 'react';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import InfoBox from '@/components/Common/ContentDetail/InfoBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import { useQueryEventNoobProHacker } from '@/services/api/eventNoobProHacker';

const ProfileBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media screen and (max-width: 800px) {
      gap: 8px;
      align-items: start;
      flex-direction: column;
   }
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const NoobProHackerLayout = styled.div`
   margin-top: 10px;
`;

const PortFolioLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;
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
   align-items: center;
   gap: 10px;
`;

const TierBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 53px;
   border-radius: 10px;
   font-size: 16px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: rgb(198, 142, 83);
`;

export default function Page() {
   const data = useQueryEventNoobProHacker();

   if (!data)
      return (
         <CommonLayout>
            <ProfileBox>
               <Skeleton width="85px" height="94px" />
            </ProfileBox>
            <Skeleton width="95px" height="22px" margin="25px 0px 0px 0px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="380px" height="213px" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

   return (
      <CommonLayout>
         <TextBox text={data.contentInfo.contentName} fontSize="24px" lineHeight="32px" fontWeight="500" />
         <NoobProHackerLayout>
            {data.lineInfo.map((item, index) => (
               <Fragment key={item.subject + index}>
                  <TextBox
                     text={index + 1 + '라인 : ' + item.subject}
                     fontSize="20px"
                     lineHeight="32px"
                     margin="20px 0px 10px 0px"
                  />
                  <PortFolioLayout>
                     {item.line_details.map(line => (
                        <Fragment key={line.minecraft_id}>
                           <PortFolioBox>
                              <ImageBox image_url={line.image_url} youtube_url={line.youtube_url} />
                              <ContentBox>
                                 <TierBox>{line.line}</TierBox>
                                 <InfoBox topText="마인크래프트 아이디" bottomText={line.minecraft_id} />
                                 <RankingBox ranking={line.ranking} />
                              </ContentBox>
                           </PortFolioBox>
                        </Fragment>
                     ))}
                  </PortFolioLayout>
               </Fragment>
            ))}
         </NoobProHackerLayout>
      </CommonLayout>
   );
}
