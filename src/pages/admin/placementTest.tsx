import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChangeEvent } from 'react';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';
import AwsStorage from '@/components/Storage/AwsStorage';
import { participantsInfoState, placementTestInfoState } from '@/services/store/placementTest';
import { storageState } from '@/services/store/storage';
import { useAwsStorage } from '@/application/accessAwsStorage';
import { Tier, createTierArray } from '@/domain/architect';
import { useMutationPlacementTest } from '@/services/placementTestAdapters';

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
   const [placementTestInfo, setPlacementTestInfo] = useRecoilState(placementTestInfoState);
   const [participantsInfo, setParticipantsInfo] = useRecoilState(participantsInfoState);
   const [viewStorage, setViewStorage] = useRecoilState(storageState);
   const { handlePlacementTestTier } = useAwsStorage();
   const mutation = useMutationPlacementTest();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPlacementTestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   return (
      <CommonLayout>
         <form>
            {viewStorage && <AwsStorage content="placementTest" />}
            <TextBox text="배치고사" fontSize="24px" lineHeight="36px" fontWeight="500" />
            <MainInfoBox>
               <Wrapper direction="column">
                  <TextBox text="시즌" fontSize="18px" fontWeight="32px" />
                  <InputBox name="season" type="number" width="70px" onChange={handleChange} />
               </Wrapper>
               <Wrapper direction="column">
                  <TextBox text="날짜" fontSize="18px" fontWeight="32px" />
                  <InputBox name="date" type="date" width="140px" onChange={handleChange} />
               </Wrapper>
               <Wrapper direction="column">
                  <TextBox text="유튜브 링크" fontSize="18px" fontWeight="32px" />
                  <InputBox name="youtube_url" type="text" width="250px" onChange={handleChange} />
               </Wrapper>
               <Button
                  onClick={e => {
                     e.preventDefault();
                     mutation.mutate({ ...placementTestInfo, participants: participantsInfo });
                  }}
                  text="DB에 추가"
                  height="60px"
                  padding="5px 10px"
               />
            </MainInfoBox>
            <Wrapper alignItems="center">
               <TextBox text="건축가 추가" fontSize="20px" lineHeight="24px" fontWeight="500" />
               <Button
                  text="파일 찾기"
                  padding="9px 15px"
                  onClick={e => {
                     e.preventDefault();
                     setViewStorage(true);
                  }}
               />
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
                           onChange={e => handlePlacementTestTier(index, e.target.value as Tier)}
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
         </form>
      </CommonLayout>
   );
}
