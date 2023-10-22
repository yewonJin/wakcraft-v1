import { Fragment } from 'react';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import { useQueryPlacementTest } from '@/services/placementTestAdapters';
import Link from 'next/link';
import { useQueryMatchYourTier } from '@/services/matchYourTierAdapters';

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
   justify-content: space-between;
   padding: 0px 24px;
   align-items: center;
   gap: 10px;
`;

const NoImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
   box-shadow: 1px 1px 3px #333;
   border-radius: 10px;
   background-color: #ddd;
`;

const Wrapper = styled.div`
   display: flex;
   gap: 2px;
   flex-direction: column;
`;

const ArchitectBox = styled.div`
   display: flex;
   flex-direction: column;
   align-items: start;
`;

const TierBox = styled.div`
   display: flex;
   gap: 10px;
`;

export default function Page() {
   const data = useQueryMatchYourTier();

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
               text={data.contentInfo.contentName}
               fontSize="24px"
               lineHeight="36px"
               fontWeight="500"
               margin="0px 0px 20px 0px"
            />
         </Title>
         <PortFolioLayout>
            {data.participants
               .sort((a, b) => a.order - b.order)
               .map((item, index) => (
                  <Fragment key={item.minecraft_id}>
                     <PortFolioBox>
                        {item.image_url ? (
                           <ImageBox image_url={item.image_url} youtube_url={item.youtube_url} />
                        ) : (
                           <NoImageBox />
                        )}
                        <ContentBox>
                           <ArchitectBox>
                              <TextBox
                                 text={'건축가'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 color="#646464"
                              />
                              <Link href={`/architect/${item.minecraft_id}`}>
                                 <TextBox
                                    text={item.minecraft_id}
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    fontWeight="500"
                                 />
                              </Link>
                           </ArchitectBox>
                           <Wrapper>
                              <TierBox>
                                 <TextBox
                                    text={'예상 : '}
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    color="#646464"
                                 />
                                 <TextBox
                                    text={item.expectedTier}
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    color="black"
                                 />
                              </TierBox>
                              <TierBox>
                                 <TextBox
                                    text={'정답 : '}
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    color="#646464"
                                 />
                                 <TextBox
                                    text={item.currentTier}
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    color="black"
                                 />
                              </TierBox>
                           </Wrapper>
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
