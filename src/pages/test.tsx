import styled from 'styled-components';
import { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { LineNav } from '@/components/Search/LineNav';
import { SearchArchitect } from '@/components/Search/SearchArchitect';
import { participationCount, winnerCount } from '@/domain/architect';
import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { convertLineTierToTier } from '@/controller/architect';
import { useShowArchitect } from '@/application/showArchitect';

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

export const getStaticProps: GetStaticProps<{ architects: Architect[] }> = async context => {
   await connectMongo();

   const architects = await Architect.findAll();

   return {
      props: {
         architects: JSON.parse(JSON.stringify(architects)),
      },
      revalidate: 600,
   };
};

export default function Search({ architects }: InferGetStaticPropsType<typeof getStaticProps>) {
   const { curTier } = useShowArchitect();

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
         <List>
            {architects
               .filter(item => convertLineTierToTier(curTier).includes(item.tier[0]))
               .map((item, _) => {
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
      </Layout>
   );
}
