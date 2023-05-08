import styled from 'styled-components';

import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { tierImage } from '@/utils/lib';
import Portfolio from '@/components/Search/Portfolio';

const ProfileBox = styled.div`
   position: relative;
   display: flex;
   gap: 1.2rem;
   align-items: center;
`;

const TierImageBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 85px;
   height: 94px;
   background-size: cover;
   background-position: center;
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;
`;

const IdBox = styled.div`
   display: flex;
   flex-direction: column;
`;

export default function Page() {
   const data = useQueryArchitectById();

   if (!data)
      return (
         <CommonLayout>
            <ProfileBox>
               <Skeleton width="85px" height="94px" />
               <IdBox>
                  <Skeleton width="120px" height="20px" margin="0px 0px 4px 0px" />
                  <Skeleton width="80px" height="18px" />
               </IdBox>
            </ProfileBox>
            <Skeleton width="95px" height="22px" margin="25px 0px 0px 0px" />
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
            <TierImageBox style={{ backgroundImage: `url(${tierImage(data.tier[data.tier.length - 1]).src})` }}>
               <TextBox
                  text={data.tier[data.tier.length - 1]}
                  textShadow="1px 1px 1px black"
                  fontSize="18px"
                  lineHeight="24px"
                  fontWeight="500"
                  textAlign="center"
                  color="white"
               />
            </TierImageBox>
            <IdBox>
               <TextBox text={data.minecraft_id} fontSize="20px" lineHeight="32px" fontWeight="500" />
               <TextBox text={data.wakzoo_id} fontSize="18px" lineHeight="24px" fontWeight="400" color="#535353" />
            </IdBox>
         </ProfileBox>
         <Portfolio info={data} />
      </CommonLayout>
   );
}
