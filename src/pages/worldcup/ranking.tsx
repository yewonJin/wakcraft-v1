import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';

import { usePlayWorldCup } from '@/application/playWorldCup';
import TextBox from '@/components/Common/TextBox';
import { renameToWebp } from '@/domain/noobProHacker';
import Skeleton from '@/components/Common/Skeleton';
import { getWinRatio } from '@/domain/worldcup';

const Layout = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   padding-top: 130px;
`;

const Main = styled.main`
   width: 1200px;
   margin: 0px auto;
`;

const TableBox = styled.ul`
   position: relative;
   display: flex;
   align-items: center;
   gap: 40px;
   list-style: none;
   margin-top: 15px;
   border-radius: 10px;
   height: 60px;
   background-color: #eee;
`;

const RankingLayout = styled.ul``;

const RankingItem = styled.li`
   position: relative;
   display: flex;
   height: 90px;
   align-items: center;
   gap: 40px;
   list-style: none;
   border-bottom: 1px solid #ddd;
`;

const RankingBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex: 1;
`;

const ImageBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   flex: 2;
   height: 100%;
`;

const TextWrapper = styled.div<{ direction: string }>`
   display: flex;
   flex-direction: ${props => (props.direction === 'column' ? 'column' : 'row')};
   gap: 6px;
   flex: 6;
`;

const WinRatio = styled.div`
   display: flex;
   flex: 4;
`;

const SelectPageList = styled.ul`
   display: flex;
   justify-content: center;
   gap: 10px;
   padding-top: 20px;
`;

const SelectPageItem = styled.li<{ page: number; index: number }>`
   list-style: none;
   padding: 5px 10px;
   background-color: ${props => (props.page === props.index ? '#ddd' : '')};
   :hover {
      cursor: pointer;
   }
`;

export default function Ranking() {
   const { data } = usePlayWorldCup();
   const [page, setPage] = useState(0);

   if (!data)
      return (
         <Layout>
            <Main>
               <Skeleton width="80px" height="32px" />
               <Skeleton height="60px" margin="15px 0px 0px 0px" borderRadius="10px" />
               {new Array(10).fill(0).map(index => (
                  <RankingItem key={index}>
                     <Skeleton />
                  </RankingItem>
               ))}
            </Main>
         </Layout>
      );

   return (
      <Layout>
         <Main>
            <TextBox text="눕프로해커 랭킹" fontSize="22px" fontWeight="500" lineHeight="32px" />
            <TableBox>
               <RankingBox>
                  <TextBox text="순위" fontSize="16px" lineHeight="24px" />
               </RankingBox>
               <ImageBox>
                  <TextBox text="이미지" fontSize="16px" lineHeight="24px" />
               </ImageBox>
               <TextWrapper direction="row">
                  <TextBox text="주제 / 마인크래프트 아이디" fontSize="16px" lineHeight="24px" />
               </TextWrapper>
               <WinRatio>
                  <TextBox text="우승 비율 (우승 횟수 / 참여 횟수)" fontSize="16px" lineHeight="24px" />
               </WinRatio>
            </TableBox>
            <RankingLayout>
               {data
                  .sort(
                     (a, b) =>
                        Math.floor((b.numberOfWin / b.numberOfParticipation) * 100) -
                        Math.floor((a.numberOfWin / a.numberOfParticipation) * 100),
                  )
                  .slice(page * 10, page * 10 + 10)
                  .map((item, index) => (
                     <RankingItem key={item.workInfo.subject}>
                        <RankingBox>
                           <TextBox text={(index + 1 + page * 10).toString()} fontSize="16px" lineHeight="24px" />
                        </RankingBox>
                        <ImageBox>
                           <Image alt="worldcup image" fill src={renameToWebp(item.workInfo.image_url)} sizes="300px" />
                        </ImageBox>
                        <TextWrapper direction="column">
                           <TextBox text={item.workInfo.subject} fontSize="18px" lineHeight="24px" />
                           <TextBox text={item.workInfo.minecraft_id} fontSize="16px" lineHeight="24px" color="#666" />
                        </TextWrapper>
                        <WinRatio>
                           <TextBox text={getWinRatio(item)} fontSize="16px" lineHeight="24px" />
                        </WinRatio>
                     </RankingItem>
                  ))}
            </RankingLayout>
            <SelectPageList>
               {new Array(Math.floor(data.length / 10) + 1).fill(0).map((item, index) => (
                  <SelectPageItem page={page} index={index} key={index} onClick={() => setPage(index)}>
                     {index + 1}
                  </SelectPageItem>
               ))}
            </SelectPageList>
         </Main>
      </Layout>
   );
}
