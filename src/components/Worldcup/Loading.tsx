import styled from 'styled-components';

import Skeleton from '../Common/Skeleton';

const Layout = styled.div`
   display: flex;
   gap: 10px;
   flex-direction: column;
   width: 1200px;
   height: 100%;
   margin: 0px auto;
   padding-top: 10px;

   @media screen and (max-width: 1400px) {
      width: 90%;
   }
`;

const SkeletonBox = styled.div<{ margin?: string; direction?: string }>`
   display: flex;
   gap: 10px;
   flex-direction: ${props => props.direction || ''};
   margin: ${props => props.margin || ''};
`;

export default function Loading() {
   return (
      <Layout>
         <Skeleton width="270px" height="32px" darkMode={true} margin="0px 0px 6px 0px" />
         <SkeletonBox>
            <Skeleton width="100px" height="32px" darkMode={true} />
            <Skeleton width="60px" height="32px" darkMode={true} />
            <Skeleton width="100px" height="32px" darkMode={true} />
         </SkeletonBox>
         <SkeletonBox direction="column" margin="40px 0px 0px 0px">
            <Skeleton width="80px" height="30px" darkMode={true} />
            <Skeleton width="600px" height="24px" darkMode={true} />
            <Skeleton width="450px" height="24px" darkMode={true} />
            <Skeleton width="470px" height="24px" darkMode={true} />
         </SkeletonBox>
      </Layout>
   );
}
