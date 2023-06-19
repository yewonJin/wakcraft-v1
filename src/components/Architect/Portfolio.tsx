import styled from 'styled-components';
import { Fragment, useState } from 'react';

import { Architect } from '@/domain/architect';
import TextBox from '../Common/TextBox';
import NoobProHackerList from './NoobProHackerList';
import PlacementTestList from './PlacementTestList';
import EventNoobProHackerList from './EventNoobProHackerList';
import ArchitectureContest from './ArchitectureContest';

const Layout = styled.div`
   margin-top: 20px;

   @media screen and (max-width: 800px) {
      width: 95%;
      margin: 0px auto;
      margin-top: 20px;
   }
`;

const Category = styled.ul`
   display: flex;
   margin-bottom: 30px;
   gap: 25px;

   @media screen and (max-width: 800px) {
      gap: 0px;
      justify-content: space-between;

      h2 {
         font-size: 16px;
      }

      > div {
         display: none;
      }
   }

   @media screen and (max-width: 800px) {
      h2 {
         font-size: 14px;
      }
   }
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #cacaca;
`;

const CategoryItem = styled.li<{ contentState: number; index: number }>`
   display: flex;
   gap: 20px;
   list-style: none;

   :hover {
      cursor: pointer;
   }

   > h2 {
      color: ${props => (props.contentState === props.index ? 'black' : '#aaa')};
   }
`;

export default function Portfolio({ info }: { info: Architect }) {
   const [contentState, setContentState] = useState(initializeContentState(info));

   return (
      <Layout>
         <Category>
            <Divider />
            {['눕프로해커', '배치고사', '이벤트 눕프핵', '치즐 건콘'].map((item, index) => {
               if (info.portfolio[categoryList[index]].length === 0) {
                  return;
               }

               return (
                  <Fragment key={item}>
                     <CategoryItem index={index} contentState={contentState} onClick={() => setContentState(index)}>
                        <TextBox text={item} fontSize="18px" lineHeight="24px" fontWeight="500" />
                     </CategoryItem>
                     <Divider />
                  </Fragment>
               );
            })}
         </Category>
         {contentState === 0 ? (
            <NoobProHackerList info={info} />
         ) : contentState === 1 ? (
            <PlacementTestList info={info} />
         ) : contentState === 2 ? (
            <EventNoobProHackerList info={info} />
         ) : (
            <ArchitectureContest info={info} />
         )}
      </Layout>
   );
}

const initializeContentState = (info: Architect) => {
   if (info.portfolio.noobProHacker.length > 0) {
      return 0;
   } else {
      if (info.portfolio.placementTest.length > 0) {
         return 1;
      } else {
         return 2;
      }
   }
};

const categoryList: ('noobProHacker' | 'placementTest' | 'eventNoobProHacker' | 'architectureContest')[] = [
   'noobProHacker',
   'placementTest',
   'eventNoobProHacker',
   'architectureContest',
];
