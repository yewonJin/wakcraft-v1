import { Fragment } from 'react';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import { useQueryPlacementTest } from '@/services/placementTestAdapters';

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
   justify-content: center;
   align-items: center;
   gap: 10px;
`;

export default function Page() {
   const data = useQueryPlacementTest();

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
            text={'시즌 ' + data.season + ' 배치고사'}
            fontSize="24px"
            lineHeight="36px"
            fontWeight="500"
            margin="0px 0px 20px 0px"
         />
         <PortFolioLayout>
            {data.participants.map((item, index) => (
               <Fragment key={item.minecraft_id}>
                  <PortFolioBox>
                     <ImageBox image_url={item.image_url} />
                     <ContentBox>
                        <TextBox
                           text={item.minecraft_id}
                           textAlign="center"
                           fontSize="16px"
                           lineHeight="24px"
                           fontWeight="500"
                        />
                        <TextBox
                           text={item.placement_result}
                           textAlign="center"
                           fontSize="16px"
                           lineHeight="24px"
                           color="#646464"
                        />
                     </ContentBox>
                  </PortFolioBox>
               </Fragment>
            ))}
         </PortFolioLayout>
      </CommonLayout>
   );
}
