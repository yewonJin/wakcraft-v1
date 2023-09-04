import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import connectMongo from '@/utils/connectMongo';
import NoobProHacker from '@/models/noobProHacker';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import TextBox from '@/components/Common/TextBox';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   width: 1200px;
   height: 100vh;
   margin: 0px auto;
   padding-top: 110px;
   padding-bottom: 50px;

   @media screen and (max-width: 1200px) {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
   }

   @media screen and (max-width: 800px) {
      padding-top: 120px;
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
   list-style: none;
   width: ${props => props.width || 'auto'};
   margin: ${props => props.margin || '0px'};

   @media screen and (max-width: 600px) {
      font-size: 14px;
   }
`;

const NoobProHackerList = styled.ul`
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
   }
`;

const NoobProHackerBox = styled.li`
   width: 100%;
   display: flex;
   align-items: center;
   height: 70px;
   padding: 10px 25px;
   border-bottom: 1px solid #cacaca;

   > p:nth-child(4) {
      color: #555;
      :hover {
         color: black;
      }
   }

   @media screen and (max-width: 800px) {
      height: 80px;
      padding: 5px 10px;
      gap: 20px;

      > p:first-child {
         display: flex;
         align-items: center;
         width: 80px;
         height: 60px;
      }      

      > p:nth-child(3) {
         display: none;
      }

      > p:nth-child(4) {
         display: none;
      }

      > p:nth-child(5) {
         display: none;
      }
   }
`;

const NoobProHackerItem = styled.p<{ width?: string }>`
   width: ${props => props.width || 'auto'};
   list-style: none;
   font-size: 16px;
   height: 24px;
`;

interface NoobProHackerWithWinner extends Omit<NoobProHacker, 'lineInfo'> {
   winnerLine: NoobProHacker['lineInfo'];
   winner: NoobProHacker['lineInfo'];
}

export const getStaticProps: GetStaticProps<{ noobProHackers: NoobProHackerWithWinner[] }> = async () => {
   await connectMongo();

   const noobProHackers = await NoobProHacker.findAllWithoutLineInfo();

   return {
      props: {
         noobProHackers: JSON.parse(JSON.stringify(noobProHackers)),
      },
   };
};

export default function Search({ noobProHackers }: InferGetStaticPropsType<typeof getStaticProps>) {
   const router = useRouter();

   return (
      <Layout>
         <TextBox text="눕프로해커" fontSize="24px" lineHeight="32px" fontWeight="500" />
         <TableHeader>
            <TableItem width="100px">회차</TableItem>
            <TableItem width="250px">주제</TableItem>
            <TableItem width="220px">우승 라인</TableItem>
            <TableItem width="220px">우승 해커</TableItem>
            <TableItem width="170px">날짜</TableItem>
            <TableItem width="150px">링크</TableItem>
         </TableHeader>
         <NoobProHackerList>
            {noobProHackers.map((item, _) => {
               return (
                  <Link key={item.contentInfo.episode} href={`/noobProHacker/${item.contentInfo.episode}`}>
                     <NoobProHackerBox>
                        <NoobProHackerItem width="100px">{item.contentInfo.episode + '회'}</NoobProHackerItem>
                        <NoobProHackerItem width="250px">{item.contentInfo.main_subject}</NoobProHackerItem>
                        <NoobProHackerItem width="220px">{item.winnerLine[0]?.subject ?? '없음'}</NoobProHackerItem>
                        <NoobProHackerItem
                           width="220px"
                           onClick={e => {
                              e.preventDefault();
                              router.push(`/architect/${item.winner[0].line_details.hacker.minecraft_id}`);
                           }}
                        >
                           {item.winner[0].line_details.hacker.minecraft_id ?? '없음'}
                        </NoobProHackerItem>
                        <NoobProHackerItem width="170px">{item.contentInfo.date.split('T')[0]}</NoobProHackerItem>
                        <YoutubeLink url={item.contentInfo.youtube_url} />
                     </NoobProHackerBox>
                  </Link>
               );
            })}
         </NoobProHackerList>
      </Layout>
   );
}
