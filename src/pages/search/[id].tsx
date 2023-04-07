import styled from 'styled-components';

import Portfolio from './Portfolio';
import { useQueryArchitectById } from '@/services/ArchitectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';

const ProfileBox = styled.div`
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
   const data = useQueryArchitectById();

   if (!data) return <div>no data</div>;

   return (
      <CommonLayout>
         <ProfileBox>
            <ProfileImage />
            <TextBox text={data.minecraft_id} fontSize="20px" lineHeight="28px"/>
         </ProfileBox>
         <Portfolio info={data} />
      </CommonLayout>
   );
}
