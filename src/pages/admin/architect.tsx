import styled from 'styled-components';

import { createTierArray } from '@/domain/architect';
import { AddArchitect } from '@/components/Admin/architect/AddArchitect';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

const Title = styled.h2`
   margin-bottom: 20px;
`;

const Wrapper = styled.div`
   display: flex;
   gap: 10px;
   margin-bottom: 10px;

   > h3 {
      width: 180px;
      text-align: end;
   }
`;

export default function Architect() {
   return (
      <Container>
         <AddArchitect />
      </Container>
   );
}
