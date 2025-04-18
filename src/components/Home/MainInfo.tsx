import styled from 'styled-components';

import TextBox from '../Common/TextBox';
import {
   ArchitectWithSortPriority,
   getMostParticipationArchitect,
   getMostWinsArchitect,
   getNumberOfArchitectsByTier,
} from '@/domain/architect';

const Layout = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 160px;

   @media screen and (max-width: 1400px) {
      width: 90%;
   }

   @media screen and (max-width: 1000px) {
      padding-top: 60px;

      > h2:nth-child(1) {
         font-size: 24px;
      }
      > h2:nth-child(2),
      > h2:nth-child(3) {
         font-size: 18px;
      }
   }
`;

const Main = styled.main`
   display: grid;
   gap: 30px;
   column-gap: 20px;
   grid-auto-rows: 200px;
   grid-template-columns: repeat(5, 1fr);
   grid-template-areas:
      'a b d d d'
      'a c d d d';
   margin-top: 35px;

   @media screen and (max-width: 1400px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
         'a b'
         'a c'
         'd d'
         'd d';
   }

   @media screen and (max-width: 700px) {
      gap: 15px;
      column-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 200px);
      grid-template-areas:
         'a b'
         'a c'
         'd d';
   }
`;

const Box = styled.div<{ area: string }>`
   display: flex;
   flex-direction: column;
   gap: ${props => (props.area === 'c' ? '20px' : '30px')};
   align-items: center;
   justify-content: space-between;
   padding: 25px 5px;
   background-color: #f0f0f0;
   border-radius: 15px;
   grid-area: ${props => props.area};
   box-shadow: 1px 1px 5px #999;

   @media screen and (max-width: 800px) {
      box-shadow: 0px 0px 0px;
   }
`;

const TextWrapper = styled.div<{ flexDirection?: string }>`
   display: flex;
   flex-direction: ${props => (props.flexDirection === 'column' ? 'column' : 'row')};
   gap: 16px;
`;

const DateLayout = styled.div`
   display: flex;
   gap: 30px;
   width: 100%;
   padding: 0px 50px;

   @media screen and (max-width: 700px) {
      padding: 0px;

      > div:nth-child(2) {
         display: none;
      }
   }
`;

const DateBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   align-items: center;
   justify-content: center;
   flex: 1;
   padding-bottom: 20px;

   @media screen and (max-width: 700px) {
      gap: 10px;

      > h2:nth-child(1) {
         font-size: 20px;
         font-weight: 500;
         line-height: 24px;
      }

      > h2:nth-child(2) {
         font-size: 18px;
         line-height: 24px;
      }

      > h2:nth-child(3) {
         font-size: 16px;
         line-height: 20px;
      }
   }
`;

export default function MainInfo({
   architects,
   recentNoobProHackerDate,
}: {
   architects: ArchitectWithSortPriority[];
   recentNoobProHackerDate: string;
}) {
   const date = new Date(recentNoobProHackerDate);
   date.setHours(0);

   return (
      <Layout>
         <TextBox text={'눕프로해커'} fontSize="32px" lineHeight="48px" fontWeight="500" />
         <TextBox
            text="스트리머 우왁굳의 마인크래프트 치즐 모드 컨텐츠이다."
            margin="20px 0px 10px 0px"
            fontSize="18px"
            lineHeight="24px"
            color="#646464"
         />
         <TextBox
            text="눕, 프로, 해커가 한 라인이 되어 주제를 선정해 작품을 건축하면 우왁굳이 감상하고 평가한다."
            fontSize="18px"
            lineHeight="1.7"
            color="#646464"
         />
         <Main>
            <Box area="a">
               <TextBox text="건축가 수" fontSize="18px" fontWeight="500" color="#868686" />
               <TextBox
                  text={`해커 ${getNumberOfArchitectsByTier(architects).hacker}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox
                  text={`국밥 ${getNumberOfArchitectsByTier(architects).gukbap}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox
                  text={`프로 ${getNumberOfArchitectsByTier(architects).pro}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox
                  text={`계륵 ${getNumberOfArchitectsByTier(architects).gyeruik}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox
                  text={`눕 ${getNumberOfArchitectsByTier(architects).noob}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox
                  text={`언랭 ${getNumberOfArchitectsByTier(architects).unranked}명`}
                  fontSize="18px"
                  fontWeight="500"
                  color="#313131"
               />
               <TextBox text="" fontSize="18px" fontWeight="500" color="#868686" />
            </Box>
            <Box area="b">
               <TextBox text="최다 우승" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  {getMostWinsArchitect(architects).map(item => (
                     <TextBox
                        key={item.minecraft_id}
                        text={item.minecraft_id}
                        fontSize="20px"
                        fontWeight="500"
                        color="#313131"
                        textAlign="center"
                     />
                  ))}
               </TextWrapper>
               <TextBox
                  text={`(${getMostWinsArchitect(architects)[0].noobProHackerInfo.win}회)`}
                  fontSize="18px"
                  fontWeight="500"
                  textAlign="center"
               />
            </Box>
            <Box area="c">
               <TextBox text="최다 참여" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  {getMostParticipationArchitect(architects).map(item => (
                     <TextBox
                        key={item.minecraft_id}
                        text={item.minecraft_id}
                        fontSize="20px"
                        fontWeight="500"
                        color="#313131"
                        textAlign="center"
                     />
                  ))}
               </TextWrapper>
               <TextBox
                  text={`(${getMostParticipationArchitect(architects)[0].noobProHackerInfo.participation}회)`}
                  fontSize="18px"
                  fontWeight="500"
                  textAlign="center"
               />
            </Box>
            <Box area="d">
               <TextBox text="형 마크 컨텐츠 많이 해줘" fontSize="18px" fontWeight="500" color="#868686" />
               <DateLayout>
                  <DateBox>
                     <TextBox text="첫 눕프핵" fontSize="18px" fontWeight="500" textAlign="center" color="#333" />
                     <TextBox
                        text={
                           'D+' +
                           Math.floor(
                              (new Date().getTime() - new Date('2021-06-05').getTime()) / (24 * 1000 * 3600),
                           ).toString()
                        }
                        fontSize="40px"
                        lineHeight="60px"
                        fontWeight="500"
                        textAlign="center"
                        color="#333"
                     />
                     <TextBox text="(2021-06-05)" fontSize="16px" textAlign="center" color="#777" />
                  </DateBox>
                  <DateBox>
                     <TextBox text="최근 눕프핵" fontSize="18px" fontWeight="500" textAlign="center" color="#333" />
                     <TextBox
                        text={
                           'D+' + Math.floor((new Date().getTime() - date.getTime()) / (24 * 1000 * 3600)).toString()
                        }
                        fontSize="40px"
                        lineHeight="60px"
                        fontWeight="500"
                        textAlign="center"
                        color="#333"
                     />
                     <TextBox
                        text={`(${recentNoobProHackerDate.split('T')[0]})`}
                        fontSize="16px"
                        textAlign="center"
                        color="#777"
                     />
                  </DateBox>
                  <DateBox>
                     <TextBox text="시즌4" fontSize="18px" fontWeight="500" textAlign="center" color="#333" />
                     <TextBox
                        text={
                           'D+' +
                           Math.floor(
                              (new Date().getTime() - new Date('2023-09-03').getTime()) / (24 * 1000 * 3600),
                           ).toString()
                        }
                        fontSize="40px"
                        lineHeight="60px"
                        fontWeight="500"
                        textAlign="center"
                        color="#333"
                     />
                     <TextBox text="(2023-09-03)" fontSize="16px" textAlign="center" color="#777" />
                  </DateBox>
               </DateLayout>
               <TextBox text="" fontSize="18px" fontWeight="500" textAlign="center" />
            </Box>
         </Main>
      </Layout>
   );
}
