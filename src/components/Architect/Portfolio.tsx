import styled from 'styled-components';
import { Fragment, useState } from 'react';

import { Architect } from '@/domain/architect';
import TextBox from '../Common/TextBox';
import NoobProHackerList from './NoobProHackerList';
import PlacementTestList from './PlacementTestList';
import EventNoobProHackerList from './EventNoobProHackerList';
import ArchitectureContest from './ArchitectureContest';
import All from './All';

const Layout = styled.div`
   margin-top: 20px;

   @media screen and (max-width: 800px) {
      margin: 0px auto;
      margin-top: 20px;
   }
`;

const CategoryContainer = styled.div`
   width: 100%;
   padding-bottom: 30px;

   @media screen and (max-width: 800px) {
      overflow-x: scroll;
      padding: 0px 3%;
      padding-bottom: 25px;
   }
`;

const Category = styled.ul`
   display: flex;
   gap: 25px;

   @media screen and (max-width: 800px) {
      width: fit-content;
      gap: 10px;
      > div {
         display: none;
      }
      h2 {
         font-size: 16px;
      }
   }
`;

const CategoryItem = styled.li<{ contentState: number; index: number }>`
   display: flex;
   gap: 20px;
   list-style: none;

   > h2 {
      color: ${props => (props.contentState === props.index ? 'black' : '#888')};
   }

   @media screen and (max-width: 800px) {
      font-size: 16px;
      background-color: #dfdfdf;
      padding: 6px 12px;
      border-radius: 16px;
      white-space: nowrap;

      :hover {
         color: black;
      }
   }

   :hover {
      cursor: pointer;
   }
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #cacaca;
`;

const ImageContainer = styled.div`
   @media screen and (max-width: 800px) {
      width: 95%;
      margin: 0px auto;
   }
`;

export default function Portfolio({ info }: { info: Architect }) {
   const [contentState, setContentState] = useState(0);

   return (
      <Layout>
         <CategoryContainer>
            <Category>
               <Divider />
               {['전체보기', '눕프로해커', '배치고사', '이벤트 눕프핵', '치즐 건콘'].map((item, index) => {
                  if (index > 0 && info.portfolio[categoryList[index] as CategoryType].length === 0) {
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
         </CategoryContainer>
         <ImageContainer>
            {contentState === 0 ? (
               <All info={info} />
            ) : contentState === 1 ? (
               <NoobProHackerList info={info} />
            ) : contentState === 2 ? (
               <PlacementTestList info={info} />
            ) : contentState === 3 ? (
               <EventNoobProHackerList info={info} />
            ) : (
               <ArchitectureContest info={info} />
            )}
         </ImageContainer>
      </Layout>
   );
}

type CategoryType = 'noobProHacker' | 'placementTest' | 'eventNoobProHacker' | 'architectureContest';

const categoryList = ['all', 'noobProHacker', 'placementTest', 'eventNoobProHacker', 'architectureContest'];
