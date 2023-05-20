import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Container = styled.nav<{ pos: boolean }>`
   width: 100%;
   position: fixed;
   display: flex;
   height: 80px;
   color: white;
   background-color: ${props => (props.pos ? 'rgba(16, 16, 16, 0.9)' : 'rgba(16, 16, 16, 0)')};
   z-index: 10;

   @media screen and (max-width: 1000px) {
      background-color: black;
   }
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

   @media screen and (max-width: 1400px) {
      width: 90%;
   }

   @media screen and (max-width: 800px) {
      justify-content: space-between;
      gap: 20px;

      > a {
         display: none;
      }

      > span {
         display: flex;
      }
   }
`;

const Menu = styled.span`
   display: none;
   > svg {
      font-size: 1.5rem;
      color: white;
   }
`;

const MenuBox = styled.div<{ isOpened: boolean }>`
   display: ${props => (props.isOpened ? 'flex' : 'none')};
   position: absolute;
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.9);
   flex-direction: column;
   margin-top: 80px;
   padding-top: 30px;
   gap: 15px;

   > a {
      font-size: 24px;
      width: 100%;
      text-align: center;
   }

   > svg {
      position: absolute;
      top: 28px;
      right: 20px;
      font-size: 1.5rem;
      color: white;
   }
`;

export default function NavBar() {
   const router = useRouter();

   const [position, setPosition] = useState(0);
   const [lastScroll, setLastScroll] = useState(0);
   const [pos, setPos] = useState(false);

   const [isOpened, setIsOpened] = useState(false);

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
      onScroll();

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
               <Link href={'/architect'}>건축가</Link>
               <Link href={'/noobProHacker'}>눕프로해커</Link>
               <Link href={'/placementTest'}>배치고사</Link>
               <Link href={'/eventNoobProHacker'}>이벤트 눕프핵</Link>
               <Menu>
                  {!isOpened ? (
                     <GiHamburgerMenu onClick={() => setIsOpened(true)} />
                  ) : (
                     <AiOutlineClose onClick={() => setIsOpened(false)} />
                  )}
               </Menu>
            </SubContainer>
            <MenuBox isOpened={isOpened}>
               <Link href={'/architect'} onClick={() => setIsOpened(false)}>
                  건축가
               </Link>
               <Link href={'/noobProHacker'} onClick={() => setIsOpened(false)}>
                  눕프로해커
               </Link>
               <Link href={'/placementTest'} onClick={() => setIsOpened(false)}>
                  배치고사
               </Link>
               <Link href={'/eventNoobProHacker'} onClick={() => setIsOpened(false)}>
                  이벤트 눕프핵
               </Link>
            </MenuBox>
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
               <Link href={'/architect'}>건축가</Link>
               <Link href={'/noobProHacker'}>눕프로해커</Link>
               <Link href={'/placementTest'}>배치고사</Link>
               <Link href={'/eventNoobProHacker'}>이벤트 눕프핵</Link>
               <Menu>
                  {!isOpened ? (
                     <GiHamburgerMenu onClick={() => setIsOpened(true)} />
                  ) : (
                     <AiOutlineClose onClick={() => setIsOpened(false)} />
                  )}
               </Menu>
            </SubContainer>
            <MenuBox isOpened={isOpened}>
               <Link href={'/architect'} onClick={() => setIsOpened(false)}>
                  건축가
               </Link>
               <Link href={'/noobProHacker'} onClick={() => setIsOpened(false)}>
                  눕프로해커
               </Link>
               <Link href={'/placementTest'} onClick={() => setIsOpened(false)}>
                  배치고사
               </Link>
               <Link href={'/eventNoobProHacker'} onClick={() => setIsOpened(false)}>
                  이벤트 눕프핵
               </Link>
            </MenuBox>
         </Container>
      );
   }
}
