import styled from 'styled-components';
import { Suspense } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { LineNav } from '@/components/Search/LineNav';
import { SearchArchitect } from '@/components/Search/SearchArchitect';
import { Architect, participationCount, winnerCount } from '@/domain/architect';
import Link from 'next/link';

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

const List = styled.ul`
   width: 1000px;
   display: flex;
   flex-direction: column;
   font-size: 20px;

   > a > li {
      padding: 10px 25px;
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

const getStaticProps: GetStaticProps<{ architects: Architect[] }> = async context => {
   const res = await fetch(`${process.env.BASE_URL}/api/architect`);
   const architects: Architect[] = await res.json();

   return {
      props: {
         architects,
      },
      revalidate: 600,
   };
};

export default function Search({ architects }: InferGetStaticPropsType<typeof getStaticProps>) {
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
            <List>
               {architects?.map((item, _) => {
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
            </List>
         </Suspense>
      </Layout>
   );
}
