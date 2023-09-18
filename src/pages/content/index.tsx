import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import connectMongo from '@/utils/connectMongo';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import EventNoobProHacker from '@/models/eventNoobProHacker';
import PlacementTest, { PlacementTestWithNumberOfParticipants } from '@/models/placementTest';
import TextBox from '@/components/Common/TextBox';
import ArchitectureContest from '@/models/architectureContest';
import MatchYourTier from '@/models/matchYourTier';

const Layout = styled.div`
   display: flex;
   gap: 50px;
   width: 1200px;
   margin: 0px auto;
   padding-top: 110px;
   padding-bottom: 50px;

   @media screen and (max-width: 1200px) {
      flex-direction: column;
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
   placementTests: PlacementTestWithNumberOfParticipants[];
   architectureContests: ArchitectureContest[];
   matchYourTiers: MatchYourTier[];
}> = async () => {
   await connectMongo();

   const placementTests = await PlacementTest.findAllWithoutParticipants();
   const eventNoobProHackers = await EventNoobProHacker.findAllWithoutLineInfo();
   const architectureContests = await ArchitectureContest.findAllWithoutLineInfo();
   const matchYourTiers = await MatchYourTier.findAllWithoutLineInfo();

   return {
      props: {
         eventNoobProHackers: JSON.parse(JSON.stringify(eventNoobProHackers)),
         placementTests: JSON.parse(JSON.stringify(placementTests)),
         architectureContests: JSON.parse(JSON.stringify(architectureContests)),
         matchYourTiers: JSON.parse(JSON.stringify(matchYourTiers)),
      },
   };
};

export default function Content({
   eventNoobProHackers,
   placementTests,
   architectureContests,
   matchYourTiers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
   return (
      <Layout>
         <ContentLayout>
            <TextBox text="배치고사" fontSize="24px" lineHeight="32px" fontWeight="500" />
            <TableHeader>
               <TableItem width="100px">시즌</TableItem>
               <TableItem width="140px">참가 인원</TableItem>
               <TableItem width="150px">날짜</TableItem>
               <TableItem width="50px">링크</TableItem>
            </TableHeader>
            <List>
               {placementTests.map((item, _) => {
                  return (
                     <Link key={'season ' + item.season} href={`/content/placementTest/${item.season}`}>
                        <Box>
                           <Item width="100px">{'S' + item.season}</Item>
                           <Item width="140px">{item.numberOfParticipants + '명'}</Item>
                           <Item width="150px">{item.date.split('T')[0]}</Item>
                           <YoutubeLink url={item.youtube_url} />
                        </Box>
                     </Link>
                  );
               })}
            </List>
            <TextBox
               text="돌아온 치즐 건콘"
               fontSize="24px"
               lineHeight="32px"
               fontWeight="500"
               margin="50px 0px 0px 0px"
            />
            <TableHeader>
               <TableItem width="100px">회차</TableItem>
               <TableItem width="200px">주제</TableItem>
               <TableItem width="170px">날짜</TableItem>
               <TableItem width="100px">링크</TableItem>
            </TableHeader>
            <List>
               {architectureContests.map((item, _) => {
                  return (
                     <Link
                        key={item.contentInfo.episode}
                        href={`/content/architectureContest/${item.contentInfo.episode}`}
                     >
                        <Box>
                           <Item width="100px">{item.contentInfo.episode + '회'}</Item>
                           <Item width="200px">{item.contentInfo.subject}</Item>
                           <Item width="170px">{item.contentInfo.date.split('T')[0]}</Item>
                           <YoutubeLink url={item.contentInfo.youtube_url} />
                        </Box>
                     </Link>
                  );
               })}
            </List>
         </ContentLayout>
         <ContentLayout>
            <TextBox text="이벤트 눕프핵" fontSize="24px" lineHeight="32px" fontWeight="500" />
            <TableHeader>
               <TableItem width="100px">회차</TableItem>
               <TableItem width="200px">주제</TableItem>
               <TableItem width="170px">날짜</TableItem>
               <TableItem width="100px">링크</TableItem>
            </TableHeader>
            <List>
               {[...eventNoobProHackers, ...matchYourTiers]
                  .sort((a, b) => a.contentInfo.episode - b.contentInfo.episode)
                  .map((item, _) => {
                     return (
                        <Link
                           key={item.contentInfo.episode}
                           href={getContentUrl(item.contentInfo.contentName, item.contentInfo.episode)}
                        >
                           <Box>
                              <Item width="100px">{item.contentInfo.episode + '회'}</Item>
                              <Item width="200px">{item.contentInfo.contentName}</Item>
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

const getContentUrl = (contentName: string, episode: number) => {
   if (contentName === '티어 맞추기') {
      return `/content/matchYourTier/${episode}`;
   } else {
      return `/content/eventNoobProHacker/${episode}`;
   }
};
