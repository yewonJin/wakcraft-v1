import styled from 'styled-components';

import Portfolio from '../../components/Search/Portfolio';
import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import icon from '../../../public/1.png';
import Skeleton from '@/components/Common/Skeleton';

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

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;
`;

export default function Page() {
   const data = useQueryArchitectById();

   if (!data)
      return (
         <CommonLayout>
            <ProfileBox>
               <Skeleton width="70px" height="70px" borderRadius="50px" />
               <Skeleton width="130px" height="30px" />
            </ProfileBox>
            <Skeleton width="130px" height="30px" margin="5px 0px 0px 0px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="380px" height="213px" borderRadius="15px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

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
