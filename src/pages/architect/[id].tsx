import styled from 'styled-components';

import Portfolio from '../../components/Search/Portfolio';
import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { tierImage, translateTier } from '@/utils/lib';

const ProfileBox = styled.div`
   position: relative;
   display: flex;
   gap: 1.2rem;
   align-items: center;
   margin-bottom: 10px;
`;

const ProfileImage = styled.span`
   width: 85px;
   height: 94px;
   background-size: cover;
   background-position: center;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2px;
`;

const Tier = styled.h2`
   color: #fff;
   text-shadow: 1px 1px 1px black;
   font-size: 18px;
   font-weight: 500;
   text-align: center;
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
            <Skeleton width="130px" height="28px" margin="30px 0px 0px 0px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="380px" height="213px" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

   return (
      <CommonLayout>
         <ProfileBox>
            <ProfileImage style={{ backgroundImage: `url(${tierImage(data.tier[0]).src})` }}>
               <Tier>{data.tier[0]}</Tier>
            </ProfileImage>
            <Wrapper>
               <TextBox text={data.minecraft_id} fontSize="20px" lineHeight="32px" fontWeight="500" />
               <TextBox text={data.wakzoo_id} fontSize="18px" lineHeight="28px" fontWeight="400" color="#535353" />
            </Wrapper>
         </ProfileBox>
         <Portfolio info={data} />
      </CommonLayout>
   );
}
