import { Fragment } from 'react';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { useQueryNoobProHacker } from '@/services/noobProHackerAdapters';
import TierBox from '@/components/Common/ContentDetail/TierBox';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import InfoBox from '@/components/Common/ContentDetail/InfoBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';

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
   height: 300px;
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

export default function Page() {
   const data = useQueryNoobProHacker();

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
         <TextBox
            text={'제 ' + data.contentInfo.episode + '회'}
            fontSize="20px"
            lineHeight="32px"
            color="#646464"
            margin="0px 0px 10px 0px"
         />
         <TextBox
            text={'눕프로해커 : ' + data.contentInfo.main_subject}
            fontSize="24px"
            lineHeight="32px"
            fontWeight="500"
         />
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
                     <PortFolioBox>
                        <ImageBox
                           image_url={item.line_details.noob.image_url}
                           youtube_url={item.line_details.noob.youtube_url}
                        />
                        <ContentBox>
                           <TierBox tier="noob" />
                           <InfoBox topText="마인크래프트 아이디" bottomText={item.line_details.noob.minecraft_id} />
                           <RankingBox ranking={item.line_details.noob.ranking} />
                        </ContentBox>
                     </PortFolioBox>
                     <PortFolioBox>
                        <ImageBox
                           image_url={item.line_details.pro.image_url}
                           youtube_url={item.line_details.pro.youtube_url}
                        />
                        <ContentBox>
                           <TierBox tier="pro" />
                           <InfoBox topText="마인크래프트 아이디" bottomText={item.line_details.pro.minecraft_id} />
                           <RankingBox ranking={item.line_details.pro.ranking} />
                        </ContentBox>
                     </PortFolioBox>
                     <PortFolioBox>
                        <ImageBox
                           image_url={item.line_details.hacker.image_url}
                           youtube_url={item.line_details.hacker.youtube_url}
                        />
                        <ContentBox>
                           <TierBox tier="hacker" />
                           <InfoBox topText="마인크래프트 아이디" bottomText={item.line_details.hacker.minecraft_id} />
                           <RankingBox ranking={item.line_details.hacker.ranking} />
                        </ContentBox>
                     </PortFolioBox>
                  </PortFolioLayout>
               </Fragment>
            ))}
         </NoobProHackerLayout>
      </CommonLayout>
   );
}
