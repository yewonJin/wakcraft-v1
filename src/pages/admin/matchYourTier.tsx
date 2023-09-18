import styled from 'styled-components';
import Image from 'next/image';

import { useAwsStorage } from '@/application/aws/accessAwsStorage';
import { useCreateMatchYourTier } from '@/application/create/createMatchYourTier';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import AwsStorage from '@/components/Storage/AwsStorage';
import { Button } from '@/components/Common/Button';
import SelectTierBox from '@/components/Common/SelectTierBox';
import { Tier } from '@/domain/architect';
import InputBox from '@/components/Common/InputBox';

const Wrapper = styled.div<{ direction?: string; alignItems?: string }>`
   display: flex;
   flex-direction: ${props => (props.direction === 'column' ? 'column' : '')};
   align-items: ${props => props.alignItems};
   gap: 10px;
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

const List = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(3, 1fr);
   margin-top: 15px;
`;

const ImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
`;

export default function MathYourTier() {
   const { isViewable, setIsViewable } = useAwsStorage();
   const {
      contentInfo,
      participantsInfo,
      changeContentInfo,
      changeExpectedTier,
      changeCurrentTier,
      changeOrder,
      changeRanking,
      addToDB,
   } = useCreateMatchYourTier();

   return (
      <CommonLayout>
         {isViewable && <AwsStorage content="matchYourTier" />}
         <TextBox text="티어 맞추기" fontSize="24px" lineHeight="36px" fontWeight="500" />
         <AddContentInfo contentInfo={contentInfo} handleChange={changeContentInfo} addContent={() => addToDB()} />
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
                        name="expectedTier"
                        value={participantsInfo[index].expectedTier}
                        onChange={e => changeExpectedTier(index, e.target.value as Tier)}
                     />
                     <SelectTierBox
                        name="currentTier"
                        value={participantsInfo[index].currentTier}
                        onChange={e => changeCurrentTier(index, e.target.value as Tier)}
                     />
                  </Wrapper>
                  <Wrapper>
                     <TextBox text="순서" />
                     <InputBox
                        type="number"
                        name="order"
                        width="40px"
                        value={item.order}
                        onChange={e => changeOrder(index, parseInt(e.target.value))}
                     />
                     <TextBox text="순위" />
                     <InputBox
                        type="number"
                        name="ranking"
                        width="40px"
                        value={item.ranking}
                        onChange={e => changeRanking(index, parseInt(e.target.value))}
                     />
                  </Wrapper>
               </Item>
            ))}
         </List>
      </CommonLayout>
   );
}
