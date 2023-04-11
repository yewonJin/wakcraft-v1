import Link from 'next/link';
import styled from 'styled-components';
import { Suspense } from 'react';

import { useShowArchitect } from '@/application/showArchitect';
import { createTierArray, participationCount, winnerCount } from '@/domain/architect';

const Layout = styled.ul`
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

export function ArchitectList() {
   const { data } = useShowArchitect();

   if (!data) return <div></div>;

   return (
      <Suspense>
         <Layout>
            {data
               .sort((a, b) => createTierArray().indexOf(a.tier[0]) - createTierArray().indexOf(b.tier[0]))
               .map((item, index) => {
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
         </Layout>
      </Suspense>
   );
}
