import Link from 'next/link';
import styled from 'styled-components';

import { Architect } from '@/domain/architect';
import { useShowArchitect } from '@/application/showArchitect';
import { convertLineTierToTier } from '@/utils/lib';

const Layout = styled.ul`
   width: 1200px;
   height: calc(70vh);
   overflow-y: scroll;
   display: flex;
   flex-direction: column;
   font-size: 20px;

   ::-webkit-scrollbar {
      width: 12px;
   }

   ::-webkit-scrollbar-thumb {
      height: 30%;
      background: gray;
   }

   ::-webkit-scrollbar-thumb {
      background: #bebebe;
      background-clip: padding-box;
      border: 1px solid transparent;
      border-radius: 8px;
   }
`;

const ArchitectInfoItem = styled.li<{ width?: string }>`
   width: ${props => props.width || 'auto'};
   list-style: none;
   font-size: 16px;
   height: 24px;
`;

const ArchitectInfoList = styled.ul`
   display: flex;
   align-items: center;
   height: 60px;
   padding: 10px 25px;
   border-bottom: 1px solid #cacaca;
`;

export function ArchitectList({ architects, curTier }: { architects: Architect[]; curTier: string }) {
   const { data } = useShowArchitect();

   if (!data) return <div>Loading</div>;

   return (
      <Layout>
         {architects
            .filter(item => convertLineTierToTier(curTier).includes(item.tier[0]))
            .map((item, _) => {
               return (
                  <Link key={item.wakzoo_id} href={`/architect/${item.minecraft_id}`}>
                     <ArchitectInfoList>
                        <ArchitectInfoItem width="180px">{item.tier[0]}</ArchitectInfoItem>
                        <ArchitectInfoItem width="250px">{item.minecraft_id}</ArchitectInfoItem>
                        <ArchitectInfoItem width="220px">{item.wakzoo_id}</ArchitectInfoItem>
                        <ArchitectInfoItem width="150px">
                           {item.noobProHackerInfo.participation + '회'}
                        </ArchitectInfoItem>
                        <ArchitectInfoItem width="150px">{item.noobProHackerInfo.win + '회'}</ArchitectInfoItem>
                     </ArchitectInfoList>
                  </Link>
               );
            })}
      </Layout>
   );
}
