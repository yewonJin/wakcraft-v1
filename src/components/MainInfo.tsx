import styled from 'styled-components';

import TextBox from './Common/TextBox';

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
         font-size: 14px;
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
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
         'a b c'
         'd d d';
   }

   @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-template-areas:
         'a b'
         'a c'
         'd d'
         'd d';
   }
`;

const Box = styled.div<{ area: string }>`
   display: flex;
   flex-direction: column;
   gap: 30px;
   align-items: center;
   padding: 25px 5px;
   background-color: #f0f0f0;
   border-radius: 15px;
   grid-area: ${props => props.area};
`;

const TextWrapper = styled.div<{ flexDirection?: string }>`
   display: flex;
   flex-direction: ${props => (props.flexDirection === 'column' ? 'column' : 'row')};
   gap: 20px;
`;

export default function MainInfo() {
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
            lineHeight="24px"
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
                     />
                  ))}
                  <TextBox
                     text={`(${getMostWinsArchitect(architects)[0].noobProHackerInfo.win}회)`}
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                  />
               </TextWrapper>
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
                     />
                  ))}
                  <TextBox
                     text={`(${getMostParticipationArchitect(architects)[0].noobProHackerInfo.participation}회)`}
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                  />
               </TextWrapper>
            </Box>
            <Box area="d">
               <TextBox text="눕프핵 우승 라인" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  <TextBox
                     text="#햄버그 스테이크 #장수말벌 #초염몽 #이노스케 #드루이드 #뢴트게늄 #징크스"
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                     color="#333"
                  />
                  <TextBox
                     text="#국밥 #모크나이퍼 #키노모토 사쿠라 #히나츠루 #릴파 #제트 #흰수염"
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                     color="#333"
                  />
                  <TextBox
                     text="#데스 #그레이몬 #리 신 #데드셀 죄수 #레미 #가오가이가 #춘리"
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                     color="#333"
                  />
                  <TextBox
                     text="#징징이 #잉클링 #가로우 #키리코 #메이 #루시나 쿠시나다 #바보들의 배"
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                     color="#333"
                  />
                  <TextBox
                     text="#뿌리 괴물 삼총사 #마리오"
                     fontSize="18px"
                     fontWeight="500"
                     textAlign="center"
                     color="#333"
                  />
               </TextWrapper>
            </Box>
         </Main>
      </Layout>
   );
}
