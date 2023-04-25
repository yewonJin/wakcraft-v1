import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

const Container = styled.nav<{ pos: boolean }>`
   width: 100%;
   position: fixed;
   display: flex;
   height: 80px;
   color: white;
   background-color: ${props => (props.pos ? 'rgba(16, 16, 16, 0.9)' : 'rgba(16, 16, 16, 0)')};
   z-index: 10;
`;

const Title = styled.h2`
   font-size: 24px;
   margin-right: 50px;
   font-weight: 600;
`;

const SubContainer = styled.div`
   width: 1200px;
   margin: 0px auto;
   display: flex;

   align-items: center;
   gap: 5rem;
`;

export default function NavBar() {
   const router = useRouter();

   const [position, setPosition] = useState(0);
   const [lastScroll, setLastScroll] = useState(0);
   const [pos, setPos] = useState(false);

   const onScroll = () => {
      setPosition(window.scrollY);

      if (Math.abs(lastScroll - position) <= 30) return;

      if (position > lastScroll && lastScroll > 0) {
         setPos(true);
      } else {
         setPos(false);
      }
      setLastScroll(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => {
         window.removeEventListener('scroll', onScroll);
      };
   }, [position, lastScroll]);

   if (router.pathname === '/') {
      return (
         <Container pos={pos}>
            <Toaster />
            <SubContainer>
               <Title>
                  <Link href={'/'}>WAKCRAFT</Link>
               </Title>
               <Link href={'/'}>눕프로해커</Link>
               <Link href={'/search'}>건축가</Link>
               <Link href="/tier">티어</Link>
            </SubContainer>
         </Container>
      );
   } else {
      return (
         <Container pos={true}>
            <Toaster />
            <SubContainer>
               <Title>
                  <Link href={'/'}>WAKCRAFT</Link>
               </Title>
               <Link href={'/'}>눕프로해커</Link>
               <Link href={'/search'}>건축가</Link>
               <Link href="/tier">티어</Link>
            </SubContainer>
         </Container>
      );
   }
}
