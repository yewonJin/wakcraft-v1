import styled from 'styled-components';
import TextBox from '../Common/TextBox';

const Layout = styled.div`
   display: flex;
   padding-top: 200px;
   width: 1200px;
   height: 100%;
   margin: 0px auto;
`;

export default function Loading() {
   return (
      <Layout>
         <TextBox textAlign="center" text={'로딩중'} fontSize="32px" lineHeight="48px" color="white" fontWeight="500" />
      </Layout>
   );
}
