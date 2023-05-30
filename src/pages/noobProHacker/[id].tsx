import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { useQueryNoobProHacker } from '@/services/noobProHackerAdapters';
import TierBox from '@/components/Common/ContentDetail/TierBox';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import InfoBox from '@/components/Common/ContentDetail/InfoBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import { getLineWinnerSubject, getWinnerId } from '@/domain/noobProHacker';

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
`;

const NoobProHackerLayout = styled.div`
   margin-top: 40px;
`;

const LineBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 40px;
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

const TextWrapper = styled.div<{ margin?: string }>`
   display: flex;
   align-items: center;
   gap: 10px;
   margin: ${props => props.margin || ''};
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #ddd;
   margin: 0px 8px;
`;

const WinnerLayout = styled.div`
   display: flex;
   gap: 18px;
   margin-top: 20px;
`;

const WinnerBox = styled.div`
   min-width: 150px;
   padding: 16px 16px;
   align-items: center;
   border-radius: 15px;
   display: flex;
   flex-direction: column;
   gap: 6px;
   background-color: #ddd;
`;

const lineArr: ('noob' | 'pro' | 'hacker')[] = ['noob', 'pro', 'hacker'];

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
            fontSize="22px"
            lineHeight="32px"
            color="#646464"
            margin="0px 0px 10px 0px"
         />
         <Title>
            <TextBox
               text={'눕프로해커 : ' + data.contentInfo.main_subject}
               fontSize="28px"
               lineHeight="40px"
               fontWeight="500"
            />
            <YoutubeLink url={data.contentInfo.youtube_url} />
         </Title>
         <WinnerLayout>
            <WinnerBox>
               <TextBox text="라인 우승" color="#646464" />
               <TextBox text={getLineWinnerSubject(data)} fontWeight="500" />
            </WinnerBox>
            <WinnerBox>
               <TextBox text="프로 우승" color="#646464" />
               <TextBox text={getWinnerId(data, 'pro')} fontWeight="500" />
            </WinnerBox>
            <WinnerBox>
               <TextBox text="해커 우승" color="#646464" />
               <TextBox text={getWinnerId(data, 'hacker')}  fontWeight="500" />
            </WinnerBox>
         </WinnerLayout>
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
                                 topText="마인크래프트 아이디"
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
      </CommonLayout>
   );
}
