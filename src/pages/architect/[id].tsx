import styled from 'styled-components';

import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { tierImage } from '@/utils/lib';
import Portfolio from '@/components/Architect/Portfolio';
import { currentTier } from '@/domain/architect';

const ProfileBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media screen and (max-width: 800px) {
      width: 95%;
      margin: 0px auto;
      gap: 8px;
      align-items: start;
      flex-direction: column;
   }
`;

const TierImageBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 85px;
   height: 94px;
   background-size: cover;
   background-position: center;
`;

const SkeletonProfileBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   gap: 20px;

   @media screen and (max-width: 800px) {
      width: 95%;
      margin: 0px auto;
      align-items: center;
   }
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const IdBox = styled.div`
   display: flex;
   flex-direction: column;
`;

const ContentContainer = styled.div`
   right: 0;
   display: flex;
   gap: 20px;
   align-items: start;

   @media screen and (max-width: 800px) {
      gap: 10px;
   }

   @media screen and (max-width: 400px) {
      > div:nth-child(3) {
         display: none;
      }
      > div:nth-child(4) {
         display: none;
      }
   }
`;

const ContentBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 3px;

   @media screen and (max-width: 800px) {
      flex-direction: row-reverse;
      align-items: center;
      gap: 0px;

      > h2 {
         font-size: 16px;
      }
   }

   > h2:first-child {
      padding: 2px 8px;
   }
`;

const Wrapper = styled.div`
   display: flex;
   gap: 1.2rem;
   align-items: center;
`;

export default function Page() {
   const data = useQueryArchitectById();

   if (!data)
      return (
         <CommonLayout>
            <SkeletonProfileBox>
               <Skeleton width="85px" height="94px" />
               <IdBox>
                  <Skeleton width="140px" height="20px" margin="0px 0px 4px 0px" />
                  <Skeleton width="80px" height="18px" />
               </IdBox>
            </SkeletonProfileBox>
            <Skeleton width="140px" height="22px" margin="25px 0px 0px 10px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="100%" aspectRatio="16/9" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

   return (
      <CommonLayout>
         <ProfileBox>
            <Wrapper>
               <TierImageBox style={{ backgroundImage: `url(${tierImage(currentTier(data)).src})` }}>
                  <TextBox
                     text={currentTier(data)}
                     textShadow="1px 1px 1px black"
                     fontSize="18px"
                     lineHeight="24px"
                     fontWeight="500"
                     textAlign="center"
                     color="white"
                  />
               </TierImageBox>
               <IdBox>
                  <TextBox text={data.minecraft_id} fontSize="20px" lineHeight="32px" fontWeight="500" />
                  <TextBox text={data.wakzoo_id} fontSize="18px" lineHeight="24px" fontWeight="400" color="#535353" />
               </IdBox>
            </Wrapper>
            <ContentContainer>
               <ContentBox>
                  <TextBox
                     textAlign="center"
                     text={data.noobProHackerInfo.participation.toString()}
                     fontSize="18px"
                     lineHeight="24px"
                     fontWeight="500"
                     color="black"
                  />
                  <TextBox text={'참여 횟수'} fontSize="18px" lineHeight="24px" fontWeight="400" color="#666" />
               </ContentBox>
               <ContentBox>
                  <TextBox
                     textAlign="center"
                     text={data.noobProHackerInfo.win.toString()}
                     fontSize="18px"
                     lineHeight="24px"
                     fontWeight="500"
                     color="black"
                  />
                  <TextBox text={'총 우승'} fontSize="18px" lineHeight="24px" fontWeight="400" color="#666" />
               </ContentBox>
               <ContentBox>
                  <TextBox
                     textAlign="center"
                     text={data.noobProHackerInfo.hackerWin.toString()}
                     fontSize="18px"
                     lineHeight="24px"
                     fontWeight="500"
                     color="black"
                  />
                  <TextBox text={'해커 우승'} fontSize="18px" lineHeight="24px" fontWeight="400" color="#666" />
               </ContentBox>
               <ContentBox>
                  <TextBox
                     textAlign="center"
                     text={data.noobProHackerInfo.proWin.toString()}
                     fontSize="18px"
                     lineHeight="24px"
                     fontWeight="500"
                     color="black"
                  />
                  <TextBox text={'프로 우승'} fontSize="18px" lineHeight="24px" fontWeight="400" color="#666" />
               </ContentBox>
            </ContentContainer>
         </ProfileBox>
         <Portfolio info={data} />
      </CommonLayout>
   );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
