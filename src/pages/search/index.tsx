import { getArchitects } from '@/services/api/architect';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import styled from 'styled-components';

const Container = styled.ul`
   display: flex;
   flex-direction: column;
   width: 1058px;
   margin: 0px auto;
   font-size: 20px;
   padding-top: 100px;

   > li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
   }
`;

export const getServerSideProps = async () => {
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery('architect', getArchitects);
  
   return {
      props: {
         dehydratedState: dehydrate(queryClient),
      },
   };
};

type ArchitectType = {
   wakzoo_id: string;
   minecraft_id: string;
   tier: string[];
};

export default function Search() {
   const { data }: UseQueryResult<ArchitectType[]> = useQuery('architect', getArchitects);

   if (!data) return <div>no data</div>;

   return (
      <Container>
         {data.map((item, index) => {
            return (
               <li key={item.wakzoo_id}>
                  <Link href={`/search/${item.minecraft_id}`}>{item.wakzoo_id + ' / ' + item.tier[0]}</Link>
               </li>
            );
         })}
      </Container>
   );
}
