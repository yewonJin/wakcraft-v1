import styled from 'styled-components';

import Portfolio from '../../components/Search/Portfolio';
import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import icon from '../../../public/1.png';

const ProfileBox = styled.div`
   display: flex;
   gap: 1.2rem;
   align-items: center;
   margin-bottom: 10px;
`;

const ProfileImage = styled.span`
   width: 70px;
   height: 70px;
   border-radius: 50px;
   background-color: #cacaca;
   background-size: cover;
`;

export default function Page() {
   const data = useQueryArchitectById();

   if (!data) return <CommonLayout>로딩중...</CommonLayout>;

   console.log(data);

   return (
      <CommonLayout>
         <ProfileBox>
            <ProfileImage style={{ backgroundImage: `url(${icon.src})` }} />
            <TextBox text={data.minecraft_id} fontSize="20px" lineHeight="32px" fontWeight="500" />
         </ProfileBox>
         <Portfolio info={data} />
      </CommonLayout>
   );
}
