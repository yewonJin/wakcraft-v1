import styled from 'styled-components';
import { Fragment } from 'react';

import { Architect } from '@/domain/architect';

import EventNoobProHackerItem from './EventNoobProHackerItem';
import PlacementTestItem from './PlacementTestItem';
import NoobProHackerItem from './NoobProHackerItem';
import TextBox from '../Common/TextBox';

const Layout = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;
export default function All({ info }: { info: Architect }) {
   const portfolioArr: any[] = [];

   info.portfolio.placementTest.forEach((item, index) =>
      portfolioArr.push(<PlacementTestItem item={item} index={index} />),
   );
   info.portfolio.noobProHacker.forEach((item, index) =>
      portfolioArr.push(<NoobProHackerItem item={item} index={index} />),
   );
   info.portfolio.architectureContest.forEach((item, index) =>
      portfolioArr.push(<EventNoobProHackerItem item={item} index={index} />),
   );
   info.portfolio.eventNoobProHacker.forEach((item, index) =>
      portfolioArr.push(<EventNoobProHackerItem item={item} index={index} />),
   );

   return (
      <Fragment>
         <Layout>
            {portfolioArr
               .sort((a, b) => new Date(b.props.item.date).getTime() - new Date(a.props.item.date).getTime())
               .map((item, index) => item)}
         </Layout>
      </Fragment>
   );
}
