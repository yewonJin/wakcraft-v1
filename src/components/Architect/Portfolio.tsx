import styled from 'styled-components';
import { Fragment, useState } from 'react';

import { Architect } from '@/domain/architect';
import TextBox from '../Common/TextBox';
import NoobProHackerList from './NoobProHackerList';
import PlacementTestList from './PlacementTestList';
import EventNoobProHackerList from './EventNoobProHackerList';

const Layout = styled.div`
   width: 100%;
   margin-top: 20px;
`;

const Category = styled.ul`
   display: flex;
   gap: 25px;
   margin-bottom: 30px;

   @media screen and (max-width: 800px) {
      justify-content: space-between;
      gap: 0px;

      > div {
         display: none;
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
   const [contentState, setContentState] = useState(0);

   return (
      <Layout>
         <Category>
            <Divider />
            {['눕프로해커', '배치고사', '이벤트 눕프핵'].map((item, index) => (                                 
               <Fragment key={item}>
                  <CategoryItem index={index} contentState={contentState} onClick={() => setContentState(index)}>
                     <TextBox text={item} fontSize="18px" lineHeight="24px" fontWeight="500" />
                  </CategoryItem>
                  <Divider />
               </Fragment>
            ))}
         </Category>
         {contentState === 0 ? (
            <NoobProHackerList info={info} />
         ) : contentState === 1 ? (
            <PlacementTestList info={info} />
         ) : (
            <EventNoobProHackerList info={info} />
         )}
      </Layout>
   );
}
