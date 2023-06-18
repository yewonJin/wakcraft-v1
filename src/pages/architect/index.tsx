import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AiFillCaretDown } from 'react-icons/ai';

import connectMongo from '@/utils/connectMongo';
import Architect from '@/models/architect';
import { useShowArchitect } from '@/application/showArchitect';
import TextBox from '@/components/Common/TextBox';
import { translateTier } from '@/utils/lib';
import { SearchArchitectWithProps } from '@/components/Architect/SearchArchitectWithProps';
import { convertLineTierToTier, currentTier } from '@/domain/architect';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 1200px;
   height: 100vh;
   margin: 0px auto;
   padding-top: 130px;
   padding-bottom: 50px;

   @media screen and (max-width: 1200px) {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
   }

   @media screen and (max-width: 800px) {
      height: auto;
      padding-top: 100px;
   }
`;

const TierNav = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;

   @media screen and (max-width: 1000px) {
      > div:last-child {
         width: 200px;
      }
   }

   @media screen and (max-width: 800px) {
      flex-direction: column-reverse;
      gap: 10px;

      > div:last-child {
         width: 95%;
      }
   }
`;

const TableHeader = styled.ul`
   display: flex;
   align-items: center;
   width: 100%;
   padding: 18px 25px;
   padding-right: 37px;
   margin-top: 15px;
   background-color: #ddd;
   border-radius: 10px;

   @media screen and (max-width: 800px) {
      display: none;
   }
`;

const TableItem = styled.li<{ width?: string; margin?: string }>`
   display: flex;
   align-items: center;
   gap: 5px;
   list-style: none;
   width: ${props => props.width || 'auto'};
   margin: ${props => props.margin || '0px'};

   @media screen and (max-width: 600px) {
      font-size: 14px;
   }
`;

const ArchitectList = styled.ul`
   width: 100%;
   height: calc(100vh - 188px);
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

   @media screen and (max-width: 800px) {
      border-top: 1px solid #ddd;
      margin-top: 10px;
      height: auto;
   }
`;

const TierList = styled.ul`
   display: flex;
   align-items: center;
   gap: 15px;

   @media screen and (max-width: 1050px) {
      gap: 5px;
   }

   @media screen and (max-width: 800px) {
      width: 100%;
      justify-content: space-around;
   }
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

   @media screen and (max-width: 1050px) {
      padding: 5px 10px;
      border-radius: 0px;
      gap: 5px;

      > span {
         display: none;
      }
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

const ArchitectInfoList = styled.ul`
   width: 100%;
   display: flex;
   align-items: center;
   height: 70px;
   padding: 10px 25px;
   border-bottom: 1px solid #cacaca;

   @media screen and (max-width: 800px) {
      padding: 5px 10px;
      height: auto;
      gap: 20px;

      > li:first-child {
         display: flex;
         align-items: center;
         width: 70px;
         height: 60px;
      }

      > li:nth-child(3) {
         display: none;
      }

      > li:nth-child(4) {
         display: none;
      }
   }
`;

const ArchitectInfoItem = styled.li<{ width?: string }>`
   width: ${props => props.width || 'auto'};
   list-style: none;
   font-size: 16px;
   height: 24px;
`;

const IdBox = styled.div`
   position: relative;
   display: flex;

   @media screen and (max-width: 800px) {
      flex-direction: column;
      > li {
         width: 100%;
      }

      > li:last-child {
         width: 100%;
         color: #535353;
      }
   }
`;

const SortButton = styled.button<{sortIndex: number}>`
   display: flex;
   align-items: center;
   padding-top: 2px;
   justify-content: center;
   width: 20px;
   height: 20px;
   outline: none;
   border: none;
   background-color: #ddd;

   > svg {
      font-size: 1.1rem;
      color: #666;
      transform: ${props => props.sortIndex === -1 ? 'rotate(180deg)' : ''};
   }

   :hover {
      cursor: pointer;

      > svg {
         color: #222;
      }
   }
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
   const { sortByTier, sortByNumberOfWin, sortByParticipation,curTier, setNavCurrentTier, handleSortButtonClick, sort } = useShowArchitect();

   console.log(sortByTier + ' ' + sortByParticipation + ' ' + sortByNumberOfWin)

   return (
      <Layout>
         <TierNav>
            <TierList>
               {['hacker', 'gukbap', 'pro', 'gyeruik', 'noob', 'unranked'].map(tier => (
                  <NavItem id={tier} key={tier} curTier={curTier} onClick={() => setNavCurrentTier(tier)}>
                     <TextBox text={translateTier(tier)} />
                     <LineCountBox>
                        {architects.filter(item => convertLineTierToTier(tier).includes(currentTier(item))).length}
                     </LineCountBox>
                  </NavItem>
               ))}
            </TierList>
            <SearchArchitectWithProps architects={architects} />
         </TierNav>
         <TableHeader>
            <TableItem width="180px">
               <TextBox text="티어" />
               <SortButton sortIndex={sortByTier} name="tier" onClick={handleSortButtonClick}>
                  <AiFillCaretDown />
               </SortButton>
            </TableItem>
            <TableItem width="250px">마인크래프트 아이디</TableItem>
            <TableItem width="220px">왁물원 아이디</TableItem>
            <TableItem width="150px">
               <TextBox text="참여 횟수" />
               <SortButton sortIndex={sortByParticipation} name="participation" onClick={handleSortButtonClick}>
                  <AiFillCaretDown />
               </SortButton>
            </TableItem>
            <TableItem width="150px">
               <TextBox text="우승 횟수" />
               <SortButton sortIndex={sortByNumberOfWin} name="win" onClick={handleSortButtonClick}>
                  <AiFillCaretDown />
               </SortButton>
            </TableItem>
         </TableHeader>
         <ArchitectList>
            {sort(architects.filter(item => convertLineTierToTier(curTier).includes(currentTier(item)))).map(
               (item, _) => {
                  return (
                     <Link key={item.wakzoo_id} href={`/architect/${item.minecraft_id}`}>
                        <ArchitectInfoList>
                           <ArchitectInfoItem width="180px">{currentTier(item)}</ArchitectInfoItem>
                           <IdBox>
                              <ArchitectInfoItem width="250px">{item.minecraft_id}</ArchitectInfoItem>
                              <ArchitectInfoItem width="220px">{item.wakzoo_id}</ArchitectInfoItem>
                           </IdBox>
                           <ArchitectInfoItem width="150px">
                              {item.noobProHackerInfo.participation + '회'}
                           </ArchitectInfoItem>
                           <ArchitectInfoItem width="150px">{item.noobProHackerInfo.win + '회'}</ArchitectInfoItem>
                        </ArchitectInfoList>
                     </Link>
                  );
               },
            )}
         </ArchitectList>
      </Layout>
   );
}
