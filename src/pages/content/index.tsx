import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import connectMongo from '@/utils/connectMongo';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import EventNoobProHacker from '@/models/eventNoobProHacker';
import PlacementTest from '@/models/placementTest';
import TextBox from '@/components/Common/TextBox';

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
      padding-top: 100px;
   }
`;

const ContentLayout = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   margin-bottom: 50px;
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

const List = styled.ul`
   width: 100%;
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

const Box = styled.li`
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
         width: 70px;
         height: 60px;
      }

      > p:nth-child(3) {
         display: none;
      }

      > p:nth-child(4) {
         display: none;
      }
   }
`;

const Item = styled.p<{ width?: string }>`
   width: ${props => props.width || 'auto'};
   list-style: none;
   font-size: 16px;
   height: 24px;
`;

export const getStaticProps: GetStaticProps<{
   eventNoobProHackers: EventNoobProHacker[];
   placementTests: PlacementTest[];
}> = async () => {
   await connectMongo();

   const placementTests = await PlacementTest.findAllWithoutParticipants();
   const eventNoobProHackers = await EventNoobProHacker.findAllWithoutLineInfo();

   return {
      props: {
         eventNoobProHackers: JSON.parse(JSON.stringify(eventNoobProHackers)),
         placementTests: JSON.parse(JSON.stringify(placementTests)),
      },
   };
};

export default function Search({
   eventNoobProHackers,
   placementTests,
}: InferGetStaticPropsType<typeof getStaticProps>) {
   return (
      <Layout>
         <ContentLayout>
            <TextBox text="배치고사" fontSize="22px" lineHeight="32px" fontWeight="500" />
            <TableHeader>
               <TableItem width="100px">시즌</TableItem>
               <TableItem width="170px">날짜</TableItem>
               <TableItem width="150px">링크</TableItem>
            </TableHeader>
            <List>
               {placementTests.map((item, _) => {
                  return (
                     <Link key={item.season} href={`/content/placementTest/${item.season}`}>
                        <Box>
                           <Item width="100px">{'S' + item.season}</Item>
                           <Item width="170px">{item.date.split('T')[0]}</Item>
                           <YoutubeLink url={item.youtube_url} />
                        </Box>
                     </Link>
                  );
               })}
            </List>
         </ContentLayout>
         <ContentLayout>
            <TextBox text="예능 눕프핵" fontSize="22px" lineHeight="32px" fontWeight="500" />
            <TableHeader>
               <TableItem width="100px">회차</TableItem>
               <TableItem width="250px">주제</TableItem>
               <TableItem width="170px">날짜</TableItem>
               <TableItem width="150px">링크</TableItem>
            </TableHeader>
            <List>
               {eventNoobProHackers.map((item, _) => {
                  return (
                     <Link key={item.contentInfo.episode} href={`/content/eventNoobProHacker/${item.contentInfo.episode}`}>
                        <Box>
                           <Item width="100px">{item.contentInfo.episode + '회'}</Item>
                           <Item width="250px">{item.contentInfo.contentName}</Item>
                           <Item width="170px">{item.contentInfo.date.split('T')[0]}</Item>
                           <YoutubeLink url={item.contentInfo.youtube_url} />
                        </Box>
                     </Link>
                  );
               })}
            </List>
         </ContentLayout>
      </Layout>
   );
}
