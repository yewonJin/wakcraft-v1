import styled from 'styled-components';
import Link from 'next/link';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';

import { useQueryArchitectureContest } from '@/services/architectureContestAdapters';

const SkeletonTitle = styled.div`
   margin-bottom: 80px;

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const Title = styled.div`
   display: flex;
   gap: 15px;
   align-items: center;

   > span {
      padding-top: 5px;
   }

   > span > svg {
      font-size: 2.3rem;
   }

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const Main = styled.main`
   width: auto;
   margin-top: 40px;
`;

const PortfolioContainer = styled.div`
   position: relative;
   width: 1200px;

   @media screen and (max-width: 1250px) {
      width: 100%;
      margin: 0px auto;
   }

   @media screen and (max-width: 800px) {
      overflow-x: visible;
   }
`;

const PortFolioLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      width: 93%;
      margin: 0px auto;
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const PortFolioBox = styled.div`
   min-width: 380px;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;

   @media screen and (max-width: 800px) {
      min-width: auto;
   }

`;

const ContentBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   padding: 0px 20px;
`;

const TextWrapper = styled.div<{ margin?: string }>`
   position: relative;
   display: flex;
   align-items: center;
   gap: 10px;
   margin: ${props => props.margin || ''};

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const LineBox = styled.div`
   width: 1200px;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 60px;

   @media screen and (max-width: 1250px) {
      width: 100%;
   }

   @media screen and (max-width: 800px) {
      width: 100%;
   }
`;

const InfoBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 2px;
`;

const IdBox = styled.div`
   position: relative;
   display: flex;
   gap: 20px;
`;

export default function Page() {
   const data = useQueryArchitectureContest();

   if (!data)
      return (
         <CommonLayout>
            <SkeletonTitle>
               <Skeleton width="120px" height="36px" />
            </SkeletonTitle>
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
               text={'치즐 건콘 - ' + data.contentInfo.subject}
               fontSize="28px"
               lineHeight="40px"
               fontWeight="500"
            />
            <YoutubeLink url={data.contentInfo.youtube_url} />
         </Title>
         <Main>
            {data.lineInfo.map((item, lineIndex) => (
               <LineBox key={item.line + lineIndex}>
                  <TextWrapper>
                     <TextBox
                        text={lineIndex + 1 + '라인'}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="24px"
                        color="#646464"
                     />
                     <TextBox text={item.line} fontSize="20px" fontWeight="500" lineHeight="32px" />
                  </TextWrapper>
                  <PortfolioContainer>
                     <PortFolioLayout>
                        {item.line_details
                           .slice(0)
                           .map(line => (
                              <PortFolioBox key={line.minecraft_id}>
                                 <ImageBox image_url={line.image_url} youtube_url={line.youtube_url} />
                                 <ContentBox>
                                    <InfoBox>
                                       <TextBox text={line.topText} fontSize="16px" lineHeight="24px" color="#646464" />
                                       <TextBox
                                          text={line.bottomText}
                                          fontSize="16px"
                                          lineHeight="24px"
                                          fontWeight="500"
                                       />
                                    </InfoBox>
                                    <IdBox>
                                       <InfoBox>
                                          <TextBox
                                             text={line.ranking + '위'}
                                             textAlign="end"
                                             fontSize="16px"
                                             fontWeight="500"
                                             color="#646464"
                                             lineHeight="24px"
                                          />
                                          <Link href={`/architect/${line.minecraft_id}`}>
                                             <TextBox
                                                text={line.minecraft_id}
                                                textAlign="center"
                                                fontSize="16px"
                                                lineHeight="24px"
                                                fontWeight="500"
                                             />
                                          </Link>
                                       </InfoBox>
                                    </IdBox>
                                 </ContentBox>
                              </PortFolioBox>
                           ))}
                     </PortFolioLayout>
                  </PortfolioContainer>
               </LineBox>
            ))}
         </Main>
      </CommonLayout>
   );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
