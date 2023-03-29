import { getArchitectById } from '@/api/architect';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import styled from 'styled-components';

import Portfolio from './Portfolio';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   margin-top: 30px;
`;

const Profile = styled.div`
   display: flex;
   gap: 1.2rem;
   align-items: center;
   margin-bottom: 10px;
`;

const ProfileName = styled.h2`
   font-size: 20px;
   font-weight: 400;
`;

const ProfileImage = styled.span`
   width: 70px;
   height: 70px;
   border-radius: 50px;
   background-color: #cacaca;
`;

type ArchitectType = {
   wakzoo_id: string;
   minecraft_id: string;
   tier: string[];
   portfolio: {
      noobProHacker: {
         episode: number;
         subject: string;
         line: string;
         image_url: string;
         youtube_url: string;
         ranking: number;
      }[];
   };
};

export const getServerSideProps = async (context: any) => {
   const { id } = context.query;

   const queryClient = new QueryClient();
   await queryClient.prefetchQuery('architect', () => getArchitectById(id));

   return {
      props: {
         dehydratedState: dehydrate(queryClient),
      },
   };
};

export default function Page() {
   const router = useRouter();
   const { id } = router.query;

   const { data }: UseQueryResult<ArchitectType> = useQuery('architect', () => getArchitectById(id as string));

   if (!data) return <div>no data</div>;

   return (
      <Container>
         <Profile>
            <ProfileImage />
            <ProfileName>{data.minecraft_id}</ProfileName>
         </Profile>
         <Portfolio info={data} />
      </Container>
   );
}
