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
      'a b c d d'
      'a f g g g';
   margin-top: 35px;

   @media screen and (max-width: 1400px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
         'a b c'
         'a f d'
         'g g g';
   }

   @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-template-areas:
         'a b'
         'a f'
         'c d'
         'g g';
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
               <TextBox text="해커 14명" fontSize="18px" fontWeight="500" color="#313131" />
               <TextBox text="국밥 14명" fontSize="18px" fontWeight="500" color="#313131" />
               <TextBox text="프로 12명" fontSize="18px" fontWeight="500" color="#313131" />
               <TextBox text="계륵 13명" fontSize="18px" fontWeight="500" color="#313131" />
               <TextBox text="눕 22명" fontSize="18px" fontWeight="500" color="#313131" />
               <TextBox text="언랭 122명" fontSize="18px" fontWeight="500" color="#313131" />
            </Box>
            <Box area="b">
               <TextBox text="최다 우승" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  <TextBox text="dackbal" fontSize="20px" fontWeight="500" color="#313131" />
                  <TextBox text="(13회)" fontSize="18px" fontWeight="500" textAlign="center" />
               </TextWrapper>
            </Box>
            <Box area="f">
               <TextBox text="최다 참여" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  <TextBox text="dackbal" fontSize="20px" fontWeight="500" color="#313131" />
                  <TextBox text="(24회)" fontSize="18px" fontWeight="500" textAlign="center" />
               </TextWrapper>
            </Box>
            <Box area="c">
               <TextBox text="현재 시즌" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper flexDirection="column">
                  <TextBox text="시즌 3" fontSize="20px" fontWeight="500" textAlign="center" />
                  <TextBox text="(2023/04/01 ~ )" fontSize="16px" fontWeight="500" textAlign="center" />
               </TextWrapper>
            </Box>
            <Box area="d">
               <TextBox text="눕프핵 진행 날짜" fontSize="18px" fontWeight="500" color="#868686" />
            </Box>

            <Box area="g">
               <TextBox text="현재까지 진행한 컨텐츠" fontSize="18px" fontWeight="500" color="#868686" />
               <TextWrapper>
                  <TextBox text="눕프로해커 : 34편" fontSize="20px" fontWeight="500" />
                  <TextBox text="배치고사 : 3번" fontSize="20px" fontWeight="500" />
                  <TextBox text="이벤트 눕프핵 : 3번" fontSize="20px" fontWeight="500" />
               </TextWrapper>
            </Box>
         </Main>
      </Layout>
   );
}
