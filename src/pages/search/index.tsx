import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { SearchArchitect } from '@/components/Search/SearchArchitect';
import { createTierArray, participationCount, winnerCount } from '@/domain/architect';
import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { convertLineTierToTier } from '@/controller/architect';
import { useShowArchitect } from '@/application/showArchitect';
import TextBox from '@/components/Common/TextBox';
import { translateTier } from '@/utils/lib';

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

const ArchitectList = styled.ul`
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

const TierList = styled.ul`
   display: flex;
   align-items: center;
   gap: 15px;
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

const LineCount = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px 10px;
   border-radius: 10px;
   background-color: #cacaca;
`;

export const getStaticProps: GetStaticProps<{ architects: Architect[] }> = async context => {
   await connectMongo();

   const architects = await Architect.findAllWithoutPortfolio();

   return {
      props: {
         architects: JSON.parse(JSON.stringify(architects)),
      },
      revalidate: 600,
   };
};

export default function Search({ architects }: InferGetStaticPropsType<typeof getStaticProps>) {
   const { curTier, setNavCurrentTier } = useShowArchitect();

   return (
      <Layout>
         <Nav>
            <TierList>
               {['hacker', 'gukbap', 'pro', 'gyeruik', 'noob'].map(tier => (
                  <NavItem id={tier} key={tier} curTier={curTier} onClick={() => setNavCurrentTier(tier)}>
                     <TextBox text={translateTier(tier)} />
                     <LineCount>
                        {architects.filter(item => convertLineTierToTier(tier).includes(item.tier[0])).length}
                     </LineCount>
                  </NavItem>
               ))}
            </TierList>
            <SearchArchitect />
         </Nav>
         <TableHeader>
            <li>티어</li>
            <li>마인크래프트 아이디</li>
            <li>왁물원 아이디</li>
            <li>참여 횟수</li>
            <li>우승 횟수</li>
         </TableHeader>
         <ArchitectList>
            {architects
               .filter(item => convertLineTierToTier(curTier).includes(item.tier[0]))
               .map((item, _) => {
                  return (
                     <Link key={item.wakzoo_id} href={`/search/${item.minecraft_id}`}>
                        <li>
                           <span>{item.tier[0]}</span>
                           <span>{item.minecraft_id}</span>
                           <span>{item.wakzoo_id}</span>
                           <span>{item.noobProHackerInfo.participation + '회'}</span>
                           <span>{item.noobProHackerInfo.win + '회'}</span>
                        </li>
                     </Link>
                  );
               })}
         </ArchitectList>
      </Layout>
   );
}
