import styled from 'styled-components';

import { LineNav } from '@/components/Search/LineNav';
import { ArchitectList } from '@/components/Search/ArchitectList';
import { SearchArchitect } from '@/components/Search/SearchArchitect';
import { Suspense } from 'react';

const Layout = styled.div`
   width: 1000px;
   margin: 0px auto;
   padding-top: 130px;
`;

const Nav = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const TableHeader = styled.ul`
   display: flex;
   align-items: center;
   justify-content: space-around;
   width: 1000px;
   padding: 15px 25px;
   margin-top: 15px;
   background-color: #ddd;
   border-radius: 10px;
   > li {
      flex: 1;
      list-style: none;
   }
`;

export default function Search() {
   return (
      <Layout>
         <Nav>
            <LineNav />
            <SearchArchitect />
         </Nav>
         <TableHeader>
            <li>티어</li>
            <li>마인크래프트 아이디</li>
            <li>왁물원 아이디</li>
            <li>참가 횟수</li>
            <li>우승 횟수</li>
         </TableHeader>
         <Suspense>
            <ArchitectList />
         </Suspense>
      </Layout>
   );
}
