import Image from 'next/image';
import styled from 'styled-components';
import thumbnail1 from '../../../public/thumbnail.png';
import hacker from '../../../public/Naruto-hacker.png';

import thumbnail2 from '../../../public/thumbnail2.png';
import thumbnail3 from '../../../public/thumbnail3.png';
import { translateTier } from '@/utils/lib';
import { Architect } from '@/Domain/architect';

const Container = styled.div`
   width: 100%;
   margin-top: 20px;
`;

const Title = styled.h1`
   font-size: 20px;
   font-weight: 500;
   margin: 0px;
`;

const Wrapper = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;
`;

const Box = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;

   > img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
   }
`;

const ContentContainer = styled.div`
   display: flex;
   gap: 20px;
`;

const TierBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 40px;
   padding: 25px;
   border-radius: 10px;
   font-size: 18px;
   color: white;
   background-color: #c760a3;
`;

const Content = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-left: 7px;
   border-right: 1px solid #cacaca;
   padding-right: 20px;

   > h2 {
      font-size: 18px;
      margin: 0px;
   }

   > h3 {
      font-size: 16px;
      margin: 0px;
      color: #646464;
   }
`;

const RankingContanier = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 100px;

   > h2 {
      font-size: 18px;
      margin: 0px;
   }

   > h3 {
      font-size: 16px;
      margin: 0px;
      color: #646464;
   }
`;

export default function Portfolio({ info }: { info: Architect }) {
   return (
      <Container>
         <Title>포트폴리오</Title>
         <Wrapper>
            {info.portfolio.noobProHacker.map((item, index) => {
               return (
                  <Box key={'noobProHacker_' + index}>
                     <Image alt="hi" src={thumbnail1} />
                     <ContentContainer>
                        <TierBox>{translateTier(item.line)}</TierBox>
                        <Content>
                           <h2>{item.subject}</h2>
                           <h3>{`제 ${item.episode}회 눕프핵`}</h3>
                        </Content>
                        <RankingContanier>
                           <h3>{'개인 : ' + item.ranking + '위'}</h3>
                           <h3>{'라인 : ' + item.ranking + '위'}</h3>
                        </RankingContanier>
                     </ContentContainer>
                  </Box>
               );
            })}
         </Wrapper>
      </Container>
   );
}
