import styled from 'styled-components';

import { createTierArray } from '@/domain/architect';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

const Title = styled.h2`
   margin-bottom: 20px;
`;

const Wrapper = styled.div`
   display: flex;
   gap: 10px;
   margin-bottom: 10px;

   > h3 {
      width: 180px;
      text-align: end;
   }
`;

export default function Architect() {
   return (
      <Container>
         <form>
            <Title>건축가 추가</Title>
            <Wrapper>
               <h3>마인크래프트 아이디</h3>
               <input />
            </Wrapper>
            <Wrapper>
               <h3>왁물원 아이디</h3>
               <input />
            </Wrapper>
            <Wrapper>
               <h3>티어</h3>
               <select>
                  {createTierArray().map(tier => {
                     return (
                        <option key={tier} value={tier}>
                           {tier}
                        </option>
                     );
                  })}
               </select>
            </Wrapper>
            <Wrapper>
               <h3>눕프핵 정보 추가</h3>
            </Wrapper>
         </form>
      </Container>
   );
}
