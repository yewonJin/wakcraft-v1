import styled from 'styled-components';

import { AddArchitect } from '@/components/Admin/architect/AddArchitect';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

export default function Architect() {
   return (
      <Container>
         <AddArchitect />
      </Container>
   );
}
