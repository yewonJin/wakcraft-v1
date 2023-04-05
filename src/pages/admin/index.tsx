import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

export default function Admin() {
   return (
      <Container>
         <h2>Admin 페이지</h2>
         <ul>
            <Link href={'/admin/architect'}>
               <li>Architect</li>
            </Link>
            <Link href={'/admin/noobProHacker'}>
               <li>NoobProHacker</li>
            </Link>
            <Link href={'/admin/placementTest'}>
               <li>PlacementTest</li>
            </Link>
         </ul>
      </Container>
   );
}
