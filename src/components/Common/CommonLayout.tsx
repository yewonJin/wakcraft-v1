import styled from 'styled-components';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 110px;
   padding-bottom: 50px;

   @media screen and (max-width: 1300px) {
      width: 95%;
   }

   @media screen and (max-width: 800px) {
      width: 100%;
      padding-top: 100px;      
   }
`;

export function CommonLayout({ children }: { children: React.ReactNode }) {
   return <Container>{children}</Container>;
}
