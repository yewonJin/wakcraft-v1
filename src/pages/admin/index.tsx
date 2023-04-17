import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

export const getServerSideProps = async (ctx: NextPageContext) => {
   const { wakcraft_access_token: token } = cookies(ctx);

   if (!token || token === '') {
      if (ctx.req && ctx.res) {
         const response = await (await fetch(`${process.env.BASE_URL}/api/auth/verify`)).json();

         if (response == false) {
            return {
               redirect: {
                  permanent: false,
                  destination: process.env.BASE_URL + '/login',
               },
               props: {},
            };
         }
      } else {
         return {
            redirect: {
               permanent: false,
               destination: process.env.BASE_URL + '/login',
            },
            props: {},
         };
      }
   }

   return {
      props: {},
   };
};

export default function Index({ login }: { login: string }) {
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
