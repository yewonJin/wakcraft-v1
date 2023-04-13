import Link from 'next/link';
import styled from 'styled-components';

import { Architect, participationCount, winnerCount } from '@/domain/architect';
import { useShowArchitect } from '@/application/showArchitect';

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

export function ArchitectList({ architects }: { architects: Architect[] }) {
   return (
      <Layout>
         {architects.map((item, _) => {
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
   );
}
