import styled from 'styled-components';

import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { useQueryNoobProHacker } from '@/services/noobProHackerAdapters';
import TierBox from '@/components/Common/ContentDetail/TierBox';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import InfoBox from '@/components/Common/ContentDetail/InfoBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';

const Layout = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 110px;
   padding-bottom: 50px;

   @media screen and (max-width: 1250px) {
      width: 100%;
      padding-top: 110px;
   }
`;

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

const EpisodeBox = styled.div`
   @media screen and (max-width: 1250px) {
      width: 95%;
      margin: 0px auto;
   }
`;

const SkeletonTitle = styled.div`
   display: flex;
   flex-direction: column;
   margin-bottom: 50px;
   gap: 20px;

   @media screen and (max-width: 1200px) {
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
      padding: 0px 3%;
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
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

   @media screen and (max-width: 1250px) {
      width: 95%;
      margin: 0px auto;
   }
`;

const NoobProHackerLayout = styled.div`
   margin-top: 40px;
`;

const LineBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 60px;
`;

const PortFolioLayout = styled.div`
   position: relative;
   display: flex;
   gap: 30px;

   @media screen and (max-width: 1250px) {
      width: 100%;
      padding: 0px 3%;
      gap: 5%;
      overflow-x: scroll;

      ::-webkit-scrollbar {
         width: 0px;
      }
   }
`;

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;

   @media screen and (max-width: 1250px) {
      min-width: 48%;
      margin: 0px auto;
   }

   @media screen and (max-width: 800px) {
      min-width: 98%;
   }
`;

const ContentBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

const TextWrapper = styled.div<{ margin?: string }>`
   display: flex;
   align-items: center;
   gap: 10px;
   margin: ${props => props.margin || ''};

   @media screen and (max-width: 1250px) {
      padding: 0px 3%;
   }
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #ddd;
   margin: 0px 8px;
`;

const lineArr: ('noob' | 'pro' | 'hacker')[] = ['noob', 'pro', 'hacker'];

export default function Page() {
   const data = useQueryNoobProHacker();

   if (!data)
      return (
         <Layout>
            <SkeletonTitle>
               <Skeleton width="60px" height="22px" />
               <Skeleton width="160px" height="28px"/>
            </SkeletonTitle>
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="100%" aspectRatio="16/9" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </Layout>
      );

   return (
      <Layout>
         <EpisodeBox>
            <TextBox
               text={'제 ' + data.contentInfo.episode + '회'}
               fontSize="22px"
               lineHeight="32px"
               color="#646464"
               margin="0px 0px 10px 0px"
            />
         </EpisodeBox>
         <Title>
            <TextBox
               text={'눕프로해커 : ' + data.contentInfo.main_subject}
               fontSize="28px"
               lineHeight="40px"
               fontWeight="500"
            />
            <YoutubeLink url={data.contentInfo.youtube_url} />
         </Title>
         <NoobProHackerLayout>
            {data.lineInfo.map((item, index) => (
               <LineBox key={item.subject + index}>
                  <TextWrapper>
                     <TextBox
                        text={index + 1 + '라인'}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="24px"
                        color="#646464"
                     />
                     <TextBox text={item.subject} fontSize="20px" fontWeight="500" lineHeight="32px" />
                     <Divider></Divider>
                     <TextWrapper>
                        <TextBox text={item.line_ranking + '위'} fontSize="18px" fontWeight="500" lineHeight="24px" />
                     </TextWrapper>
                  </TextWrapper>
                  <PortFolioLayout>
                     {lineArr.map(line => (
                        <PortFolioBox key={item.subject + line}>
                           <ImageBox
                              image_url={item.line_details[line].image_url}
                              youtube_url={item.line_details[line].youtube_url}
                           />
                           <ContentBox>
                              <TierBox tier={line} />
                              <InfoBox
                                 isArchitect={true}
                                 topText="건축가"
                                 bottomText={item.line_details[line].minecraft_id}
                              />
                              <RankingBox ranking={item.line_details[line].ranking} />
                           </ContentBox>
                        </PortFolioBox>
                     ))}
                  </PortFolioLayout>
               </LineBox>
            ))}
         </NoobProHackerLayout>
      </Layout>
   );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
