import styled from 'styled-components';
import Image from 'next/image';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import AwsStorage from '@/components/Storage/AwsStorage';
import { Button } from '@/components/Common/Button';
import { Tier, createTierArray } from '@/domain/architect';
import { useCreatePlacementTest } from '@/application/createPlacementTest';
import { useAwsStorage } from '@/application/accessAwsStorage';

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
   const { participantsInfo, addToDB, changePlacementTestInfo, changePlacementTestTier } = useCreatePlacementTest();

   return (
      <CommonLayout>
         {isViewable && <AwsStorage content="placementTest" />}
         <TextBox text="배치고사" fontSize="24px" lineHeight="36px" fontWeight="500" />
         <MainInfoBox>
            <Wrapper direction="column">
               <TextBox text="시즌" fontSize="18px" fontWeight="32px" />
               <InputBox name="season" type="number" width="70px" onChange={changePlacementTestInfo} />
            </Wrapper>
            <Wrapper direction="column">
               <TextBox text="날짜" fontSize="18px" fontWeight="32px" />
               <InputBox name="date" type="date" width="140px" onChange={changePlacementTestInfo} />
            </Wrapper>
            <Wrapper direction="column">
               <TextBox text="유튜브 링크" fontSize="18px" fontWeight="32px" />
               <InputBox name="youtube_url" type="text" width="250px" onChange={changePlacementTestInfo} />
            </Wrapper>
            <Button onClick={() => addToDB()} text="DB에 추가" height="60px" padding="5px 10px" />
         </MainInfoBox>
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
                     <select
                        name="tier"
                        value={participantsInfo[index].placement_result}
                        onChange={e => changePlacementTestTier(index, e.target.value as Tier)}
                     >
                        {createTierArray().map(tier => {
                           return (
                              <option key={tier} value={tier}>
                                 {tier}
                              </option>
                           );
                        })}
                     </select>
                  </Wrapper>
               </Item>
            ))}
         </List>
      </CommonLayout>
   );
}
