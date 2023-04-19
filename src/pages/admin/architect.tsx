import styled from 'styled-components';

import { AddArchitect } from '@/components/Admin/architect/AddArchitect';
import TextBox from '@/components/Common/TextBox';
import UpdateArchitect from '@/components/Admin/architect/UpdateArchitect';

const Layout = styled.div`
   width: 1100px;
   height: 100vh;
   margin: 0px auto;
   padding-top: 110px;
`;

const AddBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-bottom: 30px;
`;

const UpdateBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

export default function Architect() {
   return (
      <Layout>
         <AddBox>
            <TextBox text={'건축가 추가'} fontSize="24px" lineHeight="36px" fontWeight="500" />
            <AddArchitect />
         </AddBox>
         <UpdateBox>
            <TextBox text={'건축가 수정'} fontSize="24px" lineHeight="36px" fontWeight="500" />
            <UpdateArchitect />
         </UpdateBox>
      </Layout>
   );
}
