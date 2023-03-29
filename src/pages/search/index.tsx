import { getArchitects } from '@/api/architect';
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   width: 1200px;
   margin: 0px auto;
   margin-top: 30px;
   font-size: 20px;
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
               <a href={'search' + '/' + item.minecraft_id} key={'data_' + index}>
                  {item.minecraft_id}
               </a>
            );
         })}
      </Container>
   );
}
