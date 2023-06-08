import { Fragment } from 'react';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import { useQueryPlacementTest } from '@/services/placementTestAdapters';
import Link from 'next/link';

const Title = styled.div`
   @media screen and (max-width: 800px) {
      width: 93%;
      margin: 0px auto;
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
      padding: 0px 3%;
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const PortFolioLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;

   @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      width: 93%;
      margin: 0px auto;
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
   justify-content: center;
   align-items: center;
   gap: 10px;
`;

export default function Page() {
   const data = useQueryPlacementTest();

   if (!data)
      return (
         <CommonLayout>
            <Skeleton width="120px" height="30px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="100%" aspectRatio="16/9" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

   return (
      <CommonLayout>
         <Title>
            <TextBox
               text={'시즌 ' + data.season + ' 배치고사'}
               fontSize="24px"
               lineHeight="36px"
               fontWeight="500"
               margin="0px 0px 20px 0px"
            />
         </Title>
         <PortFolioLayout>
            {data.participants.map((item, index) => (
               <Fragment key={item.minecraft_id}>
                  <PortFolioBox>
                     <ImageBox image_url={item.image_url} />
                     <ContentBox>
                        <Link href={`/architect/${item.minecraft_id}`}>
                           <TextBox
                              text={item.minecraft_id}
                              textAlign="center"
                              fontSize="16px"
                              lineHeight="24px"
                              fontWeight="500"
                           />
                        </Link>
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

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
