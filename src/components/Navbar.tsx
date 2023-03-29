import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
   width: 100%;
   position: fixed;
   display: flex;
   height: 80px;
   color: white;
`;

const Title = styled.h2`
   font-size: 24px;
   margin-right: 50px;
   font-weight: 600;
`;

const SubContainer = styled.div`
   width: 1580px;
   margin: 0px auto;
   display: flex;

   align-items: center;
   gap: 5rem;
`;

export default function NavBar() {
   return (
      <Container>
         <SubContainer>
            <Title>
               <Link href="/">WAKCRAFT</Link>
            </Title>
            <Link href="/">눕프로해커</Link>
            <Link href="/search">건축가</Link>
            <Link href="/tier">티어</Link>
         </SubContainer>
      </Container>
   );
}
