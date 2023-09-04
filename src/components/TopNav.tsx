import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Container = styled.nav<{ isScrolled: boolean; position: number; isMainPage: boolean }>`
   width: 100%;
   position: fixed;
   display: ${props => (!props.isScrolled && props.position >= 100 ? 'none' : 'flex')};
   height: 80px;
   background-color: ${props => (props.isMainPage && props.position <= 100 ? '' : 'white')};
   color: ${props => (props.position <= 100 && props.isMainPage ? 'white' : 'black')};
   z-index: 10;

   @media screen and (max-width: 1000px) {
      display: flex;
      background-color: white;
      color: black;
   }
`;

const Title = styled.h2`
   font-size: 24px;
   margin-right: 50px;
   font-weight: 600;
`;

const NavList = styled.div`
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
      color: black;
   }
`;

const MenuBox = styled.div<{ isOpened: boolean }>`
   display: ${props => (props.isOpened ? 'flex' : 'none')};
   position: fixed;
   width: 100vw;
   height: 100vh;
   background-color: rgba(255, 255, 255, 0.9);
   flex-direction: column;
   margin-top: 80px;
   padding-top: 20px;
   gap: 26px;

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
   }
`;

export default function TopNav() {
   const router = useRouter();

   const [position, setPosition] = useState(0);
   const [lastScroll, setLastScroll] = useState(0);

   const [isScrolled, setIsScrolled] = useState(false);
   const [isOpened, setIsOpened] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         setPosition(window.scrollY);

         if (Math.abs(lastScroll - position) <= 40) return;

         if (position > lastScroll && lastScroll > 0) {
            setIsScrolled(false);
         } else {
            setIsScrolled(true);
         }
         setLastScroll(window.scrollY);
      };

      onScroll();

      window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
      };
   }, [position]);

   // 모바일 환경에서 Navbar 클릭하면 스크롤 잠그기
   useCallback(() => {
      if (typeof document === 'undefined') return;

      if (isOpened) {
         document.body.style.cssText = `
         position: fixed; 
         top: -${window.scrollY}px;
         overflow-y: scroll;
         width: 100%;`;
      } else {
         document.body.style.cssText = '';
      }
   }, [isOpened])();

   if (router.pathname === '/') {
      return (
         <Container isScrolled={isScrolled} position={position} isMainPage={true}>
            <Toaster />
            <NavList>
               <Title>
                  <Link href={'/'}>WAKCRAFT</Link>
               </Title>
               <Link href={'/architect'}>건축가</Link>
               <Link href={'/noobProHacker'}>눕프로해커</Link>
               <Link href={'/content'}>컨텐츠</Link>
               <Link href={'/worldcup'}>월드컵</Link>
               <Menu>
                  {!isOpened ? (
                     <GiHamburgerMenu onClick={() => setIsOpened(true)} />
                  ) : (
                     <AiOutlineClose onClick={() => setIsOpened(false)} />
                  )}
               </Menu>
            </NavList>
            <MenuBox isOpened={isOpened}>
               <Link href={'/architect'} onClick={() => setIsOpened(false)}>
                  건축가
               </Link>
               <Link href={'/noobProHacker'} onClick={() => setIsOpened(false)}>
                  눕프로해커
               </Link>
               <Link href={'/content'} onClick={() => setIsOpened(false)}>
                  컨텐츠
               </Link>
               <Link href={'/worldcup'} onClick={() => setIsOpened(false)}>
                  월드컵
               </Link>
            </MenuBox>
         </Container>
      );
   } else {
      return (
         <Container isScrolled={isScrolled} position={position} isMainPage={false}>
            <Toaster />
            <NavList>
               <Title>
                  <Link href={'/'}>WAKCRAFT</Link>
               </Title>
               <Link href={'/architect'}>건축가</Link>
               <Link href={'/noobProHacker'}>눕프로해커</Link>
               <Link href={'/content'}>컨텐츠</Link>
               <Link href={'/worldcup'}>월드컵</Link>
               <Menu>
                  {!isOpened ? (
                     <GiHamburgerMenu onClick={() => setIsOpened(true)} />
                  ) : (
                     <AiOutlineClose onClick={() => setIsOpened(false)} />
                  )}
               </Menu>
            </NavList>
            <MenuBox isOpened={isOpened}>
               <Link href={'/architect'} onClick={() => setIsOpened(false)}>
                  건축가
               </Link>
               <Link href={'/noobProHacker'} onClick={() => setIsOpened(false)}>
                  눕프로해커
               </Link>
               <Link href={'/content'} onClick={() => setIsOpened(false)}>
                  컨텐츠
               </Link>
               <Link href={'/worldcup'} onClick={() => setIsOpened(false)}>
                  월드컵
               </Link>
            </MenuBox>
         </Container>
      );
   }
}
