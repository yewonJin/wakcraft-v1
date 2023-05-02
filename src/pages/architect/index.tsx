import styled from 'styled-components';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { useShowArchitect } from '@/application/showArchitect';
import TextBox from '@/components/Common/TextBox';
import { convertLineTierToTier, translateTier } from '@/utils/lib';
import { SearchArchitectWithProps } from '@/components/Search/SearchArchitectWithProps';
import { ArchitectList } from '@/components/Search/ArchitectList';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 1200px;
   margin: 0px auto;
   padding-top: 130px;
`;

const TierNav = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 1200px;
`;

const TableHeader = styled.ul`
   display: flex;
   align-items: center;
   width: 1200px;
   padding: 18px 25px;
   padding-right: 37px;
   margin-top: 15px;
   background-color: #ddd;
   border-radius: 10px;
`;

const TableItem = styled.li<{ width?: string; margin?: string }>`
   list-style: none;
   width: ${props => props.width || 'auto'};
   margin: ${props => props.margin || '0px'};
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

const LineCountBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px 10px;
   border-radius: 10px;
   background-color: #cacaca;
`;

export const getStaticProps: GetStaticProps<{ architects: Architect[] }> = async () => {
   await connectMongo();

   const architects = await Architect.findAllWithoutPortfolio();

   return {
      props: {
         architects: JSON.parse(JSON.stringify(architects)),
      },
   };
};

export default function Search({ architects }: InferGetStaticPropsType<typeof getStaticProps>) {
   const { curTier, setNavCurrentTier } = useShowArchitect();

   return (
      <Layout>
         <TierNav>
            <TierList>
               {['hacker', 'gukbap', 'pro', 'gyeruik', 'noob', 'unranked'].map(tier => (
                  <NavItem id={tier} key={tier} curTier={curTier} onClick={() => setNavCurrentTier(tier)}>
                     <TextBox text={translateTier(tier)} />
                     <LineCountBox>
                        {architects.filter(item => convertLineTierToTier(tier).includes(item.tier[0])).length}
                     </LineCountBox>
                  </NavItem>
               ))}
            </TierList>
            <SearchArchitectWithProps architects={architects} />
         </TierNav>
         <TableHeader>
            <TableItem width="180px">티어</TableItem>
            <TableItem width="250px">마인크래프트 아이디</TableItem>
            <TableItem width="220px">왁물원 아이디</TableItem>
            <TableItem width="150px">참여 횟수</TableItem>
            <TableItem width="150px">우승 횟수</TableItem>
         </TableHeader>
         <ArchitectList architects={architects} curTier={curTier} />
      </Layout>
   );
}
