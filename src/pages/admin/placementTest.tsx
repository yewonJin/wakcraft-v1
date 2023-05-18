import styled from 'styled-components';
import Image from 'next/image';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import AwsStorage from '@/components/Storage/AwsStorage';
import { Button } from '@/components/Common/Button';
import { Tier } from '@/domain/architect';
import { useCreatePlacementTest } from '@/application/createPlacementTest';
import { useAwsStorage } from '@/application/accessAwsStorage';
import SelectTierBox from '@/components/Common/SelectTierBox';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';

const Wrapper = styled.div<{ direction?: string; alignItems?: string }>`
   display: flex;
   flex-direction: ${props => (props.direction === 'column' ? 'column' : '')};
   align-items: ${props => props.alignItems};
   gap: 10px;
   margin-top: 15px;
`;

const MainInfoBox = styled.div`
   display: flex;
   gap: 25px;
   margin-bottom: 30px;
`;

const List = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(3, 1fr);
   margin-top: 15px;
`;

const Item = styled.li`
   display: flex;
   flex-direction: column;
   gap: 10px;
   list-style: none;
   position: relative;
   aspect-ratio: 16/9;
`;

const ImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
`;

export default function PlacementTest() {
   const { isViewable, setIsViewable } = useAwsStorage();
   const { placementTestInfo, participantsInfo, addToDB, changePlacementTestInfo, changePlacementTestTier } =
      useCreatePlacementTest();

   return (
      <CommonLayout>
         {isViewable && <AwsStorage content="placementTest" />}
         <TextBox text="배치고사" fontSize="24px" lineHeight="36px" fontWeight="500" />
         <AddContentInfo
            contentInfo={placementTestInfo}
            handleChange={changePlacementTestInfo}
            addContent={() => addToDB()}
         />
         <Wrapper alignItems="center">
            <TextBox text="건축가 추가" fontSize="20px" lineHeight="24px" fontWeight="500" />
            <Button text="파일 찾기" padding="9px 15px" onClick={() => setIsViewable(true)} />
         </Wrapper>
         <List>
            {participantsInfo?.map((item, index) => (
               <Item key={item.minecraft_id + index}>
                  <ImageBox>
                     <Image fill sizes="400px" alt="image" src={item.image_url} />
                  </ImageBox>
                  <Wrapper>
                     <TextBox text={'마인크래프트 id : ' + item.minecraft_id} />
                     <SelectTierBox
                        name="tier"
                        value={participantsInfo[index].placement_result}
                        onChange={e => changePlacementTestTier(index, e.target.value as Tier)}
                     />
                  </Wrapper>
               </Item>
            ))}
         </List>
      </CommonLayout>
   );
}
