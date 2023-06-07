import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';

import { usePlayWorldCup } from '@/application/playWorldCup';
import TextBox from '@/components/Common/TextBox';
import { renameToWebp } from '@/domain/noobProHacker';
import Skeleton from '@/components/Common/Skeleton';
import { getWinRatio } from '@/domain/worldcup';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Layout = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   padding-top: 130px;

   @media screen and (max-width: 800px) {
      padding-top: 110px;
   }
`;

const Main = styled.main`
   width: 1200px;
   margin: 0px auto;

   @media screen and (max-width: 1300px) {
      width: 95%;
   }
`;

const TableBox = styled.ul`
   position: relative;
   display: flex;
   align-items: center;
   gap: 40px;
   list-style: none;
   margin-top: 15px;
   border-radius: 10px;
   padding: 15px 0px;
   background-color: #eee;

   @media screen and (max-width: 800px) {
      display: none;
   }
`;

const RankingLayout = styled.ul`
   @media screen and (max-width: 800px) {
      margin-top: 20px;
   }
`;

const RankingItem = styled.li`
   position: relative;
   display: flex;
   height: 90px;
   align-items: center;
   gap: 40px;
   list-style: none;
   border-bottom: 1px solid #ddd;

   @media screen and (max-width: 800px) {
      height: 70px;
      gap: 15px;
   }
`;

const RankingBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-left: 30px;
   min-width: 30px;   

   @media screen and (max-width: 800px) {
      flex: 0;
      min-width: 20px;   
      margin-left: 5px;
      margin-right: 3px;
   }
`;

const ImageBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   flex: 2;
   height: 100%;

   @media screen and (max-width: 800px) {
      min-width: 60px;

      > img {
         object-fit: cover;
      }
   }
`;

const TextWrapper = styled.div<{ direction: string }>`
   display: flex;
   flex-direction: ${props => (props.direction === 'column' ? 'column' : 'row')};
   gap: 4px;
   flex: 5;

   @media screen and (max-width: 800px) {
      > h2 {
         font-size: 14px;
      }
      flex: 4;
   }
`;

const WinRatio = styled.div`
   display: flex;
   flex: 4;

   @media screen and (max-width: 800px) {
      flex: 1;

      > div > h2:nth-child(2) {
         display: none;
      }
   }
`;

const YoutubeBox = styled.div`
   display: flex;
   flex: 2;

   @media screen and (max-width: 800px) {
      flex: 1;
      display: none;
   }
`;

const SelectPageBox = styled.div`
   position: relative;
   padding-top: 20px;
   margin-bottom: 40px;
`;

const SelectPageList = styled.ul`
   width: 350px;
   position: relative;
   display: flex;
   justify-content: center;
   gap: 10px;
   margin: 0px auto;
`;

const SelectPageItem = styled.li<{ page: number; index: number }>`
   display: ${props =>
      props.index < Math.floor(props.page / 5 + 1) * 5 && props.index >= Math.floor(props.page / 5) * 5
         ? 'flex'
         : 'none'};

   list-style: none;
   padding: 5px 10px;
   background-color: ${props => (props.page === props.index ? '#ddd' : '')};
   :hover {
      cursor: pointer;
   }
`;

const SelectPageButton = styled.span<{ direction: 'left' | 'right'; page: number }>`
   position: absolute;
   display: ${props =>
      (props.direction === 'left' && props.page === 0) || (props.direction === 'right' && props.page === 12)
         ? 'none'
         : 'flex'};
   justify-content: center;
   align-items: center;
   width: 24px;
   height: 24px;
   bottom: 4px;
   left: ${props => (props.direction === 'left' ? '43px' : '')};
   right: ${props => (props.direction === 'right' ? '43px' : '')};

   :hover {
      cursor: pointer;

      > svg {
         font-size: 1.1rem;
      }
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
               <TextWrapper direction="column">
                  <TextBox text="주제" fontSize="16px" lineHeight="24px" />
                  <TextBox text="건축가" fontSize="14px" lineHeight="24px" color="#666" />
               </TextWrapper>
               <WinRatio>
                  <TextWrapper direction="column">
                     <TextBox text="우승 비율" fontSize="16px" lineHeight="24px" />
                     <TextBox text="(우승 횟수 / 참여 횟수)" fontSize="14px" lineHeight="24px" color="#666" />
                  </TextWrapper>
               </WinRatio>
               <YoutubeBox>
                  <TextBox text="링크" fontSize="16px" lineHeight="24px" />
               </YoutubeBox>
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
                           <Image alt="worldcup image" fill src={renameToWebp(item.workInfo.image_url)} sizes="200px" />
                        </ImageBox>
                        <TextWrapper direction="column">
                           <TextBox text={item.workInfo.subject} fontSize="18px" lineHeight="24px" />
                           <TextBox text={item.workInfo.minecraft_id} fontSize="16px" lineHeight="24px" color="#666" />
                        </TextWrapper>
                        <WinRatio>
                           <TextBox text={getWinRatio(item)} fontSize="16px" lineHeight="24px" />
                        </WinRatio>
                        <YoutubeBox>
                           <YoutubeLink url={item.workInfo.youtube_url} />
                        </YoutubeBox>
                     </RankingItem>
                  ))}
            </RankingLayout>
            <SelectPageBox>
               <SelectPageList>
                  <SelectPageButton
                     direction="left"
                     page={page}
                     onClick={() =>
                        setPage(prev => {
                           if (prev === 0) return prev;
                           return prev - 1;
                        })
                     }
                  >
                     <AiOutlineLeft />
                  </SelectPageButton>
                  {new Array(Math.floor(data.length / 10) + 1).fill(0).map((_, index) => (
                     <SelectPageItem page={page} index={index} key={index} onClick={() => setPage(index)}>
                        {index + 1}
                     </SelectPageItem>
                  ))}
                  <SelectPageButton
                     direction="right"
                     page={page}
                     onClick={() =>
                        setPage(prev => {
                           if (prev === Math.floor(data.length / 10)) return prev;
                           return prev + 1;
                        })
                     }
                  >
                     <AiOutlineRight />
                  </SelectPageButton>
               </SelectPageList>
            </SelectPageBox>
         </Main>
      </Layout>
   );
}
