import { useState } from 'react';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { getArchitects } from '@/services/api/architect';
import { Architect, participationCount, winnerCount } from '@/domain/architect';

const Layout = styled.div`
   width: 1100px;
   margin: 0px auto;
   padding-top: 130px;
`;

const Container = styled.ul`
   width: 1100px;
   display: flex;
   flex-direction: column;
   font-size: 20px;

   > a > li {
      padding: 10px 25px;
      width: 1100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #cacaca;

      > span {
         flex: 1;
         font-size: 16px;
      }
   }
`;

const Nav = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const NavItem = styled.div<{ curTier: string }>`
   display: flex;
   align-items: center;
   gap: 10px;
   padding: 12px 14px;
   border-radius: 15px;
   background-color: ${props => (props.id === props.curTier ? '#aaa' : '')};
   :hover {
      cursor: pointer;
      background-color: #aaa;
   }
`;

const NavWrapper = styled.ul`
   display: flex;
   align-items: center;
   gap: 15px;
`;

const InputWrapper = styled.div`
   position: relative;
   display: flex;
   align-items: center;

   > svg {
      position: absolute;
      left: 10px;
      font-size: 1.5rem;
      font-weight: 400;
   }
`;

const LineCount = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px 10px;
   border-radius: 10px;
   background-color: #cacaca;
`;

const TableHeader = styled.ul`
   display: flex;
   align-items: center;
   justify-content: space-around;
   width: 1100px;
   padding: 15px 25px;
   margin-top: 15px;
   background-color: #ddd;
   border-radius: 10px;
   > li {
      flex: 1;
      list-style: none;
   }
`;

export const getServerSideProps = async () => {
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery('architect', getArchitects);

   return {
      props: {
         dehydratedState: dehydrate(queryClient),
      },
   };
};

export default function Search() {
   const { data }: UseQueryResult<Architect[]> = useQuery('architect', getArchitects);
   const [input, setInput] = useState('');
   const [curTier, setCurTier] = useState('all');

   if (!data) return <div>no data</div>;

   return (
      <Layout>
         <Nav>
            <NavWrapper>
               <NavItem id="all" curTier={curTier} onClick={() => setCurTier('all')}>
                  <TextBox text="전체" />
                  <LineCount>150</LineCount>
               </NavItem>
               <NavItem id="hacker" curTier={curTier} onClick={() => setCurTier('hacker')}>
                  <TextBox text="해커" />
                  <LineCount>12</LineCount>
               </NavItem>
               <NavItem id="gukbap" curTier={curTier} onClick={() => setCurTier('gukbap')}>
                  <TextBox text="국밥" />
                  <LineCount>24</LineCount>
               </NavItem>
               <NavItem id="pro" curTier={curTier} onClick={() => setCurTier('pro')}>
                  <TextBox text="프로" />
                  <LineCount>36</LineCount>
               </NavItem>
               <NavItem id="gyeruik" curTier={curTier} onClick={() => setCurTier('gyeruik')}>
                  <TextBox text="계륵" />
                  <LineCount>48</LineCount>
               </NavItem>
               <NavItem id="noob" curTier={curTier} onClick={() => setCurTier('noob')}>
                  <TextBox text="눕" />
                  <LineCount>60</LineCount>
               </NavItem>
            </NavWrapper>
            <InputWrapper>
               <IoIosSearch />
               <InputBox
                  type="text"
                  name="search"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  width="320px"
                  height="40px"
                  borderRadius="10px"
                  border="none"
                  backgroundColor="#F5F5F5"
                  padding="0px 20px 0px 45px"
               />
            </InputWrapper>
         </Nav>
         <TableHeader>
            <li>티어</li>
            <li>마인크래프트 아이디</li>
            <li>왁물원 아이디</li>
            <li>참가 횟수</li>
            <li>우승 횟수</li>
         </TableHeader>
         <Container>
            {data.map((item, index) => {
               return (
                  <Link key={item.wakzoo_id} href={`/search/${item.minecraft_id}`}>
                     <li>
                        <span>{item.tier[0]}</span>
                        <span>{item.minecraft_id}</span>
                        <span>{item.wakzoo_id}</span>
                        <span>{participationCount(item) + '회'}</span>
                        <span>{winnerCount(item) + '회'}</span>
                     </li>
                  </Link>
               );
            })}
         </Container>
      </Layout>
   );
}
