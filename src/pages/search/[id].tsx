import { getArchitectById } from '@/services/api/architect';
import { useQueryArchitectById } from '@/services/ArchitectAdapters';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import styled from 'styled-components';

import Portfolio from './Portfolio';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 120px;
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

export default function Page() {
   const router = useRouter();
   const { id } = router.query;

   const data = useQueryArchitectById();

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
