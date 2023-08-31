import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import cafe from '../../../../public/assets/icons/cafe.png';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { useQueryPlacementTest, useQueryPlacementTestApplying } from '@/services/placementTestAdapters';
import { Architect, currentTier } from '@/domain/architect';
import { useQueriesArchitectsById } from '@/services/architectAdapters';
import Portfolio from '@/components/Architect/Portfolio';
import { tierImage } from '@/utils/lib';
import { Button } from '@/components/Common/Button';
import { createTierArray } from '@/domain/architect';

const Layout = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 130px;
   padding-bottom: 50px;

   @media screen and (max-width: 2400px) {
      width: 95%;
   }

   @media screen and (max-width: 1800px) {
      width: 1200px;
   }

   @media screen and (max-width: 1300px) {
      width: 95%;
   }

   @media screen and (max-width: 800px) {
      width: 100%;
      padding-top: 110px;
   }
`;

const Title = styled.div`
   @media screen and (max-width: 800px) {
      width: 93%;
      margin: 0px auto;
   }
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
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

const TierTableImageBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 70px;
   height: 78px;
   background-size: cover;
   background-position: center;
`;

const ButtonWrapper = styled.div`
   display: flex;
   width: 1200px;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 20px;
   margin-top: 40px;

   @media screen and (max-width: 1300px) {
      width: 98%;
      margin-left: auto;
      margin-right: auto;
   }
`;

const Wrapper = styled.div`
   display: flex;
   gap: 1.2rem;
   align-items: center;
   margin: 12px 0px;
`;

const IdBox = styled.div`
   display: flex;
   flex-direction: column;
`;

const ArchitectBox = styled.div<{ index: number; count: number }>`
   width: 1200px;
   display: ${props => (props.index == props.count ? 'flex' : 'none')};
   position: relative;
   flex-direction: column;

   @media screen and (max-width: 1300px) {
      width: 100%;
   }
`;

const Container = styled.div`
   display: flex;
   width: 100%;
`;

const ProfileBox = styled.div`
   width: 100%;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media screen and (max-width: 800px) {
      width: 95%;
      margin: 0px auto;
      gap: 8px;
      align-items: start;
      flex-direction: column;
   }
`;

const CountBox = styled.span`
   background-color: #ddd;
   padding: 5px 40px;
`;

const LinkBox = styled.span`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 10px;
   margin-top: 15px;
   padding: 10px 10px;

   :hover {
      background-color: #dfdfdf;
      cursor: pointer;
   }
`;

const TierTableContainer = styled.div`
   @media screen and (max-width: 1800px) {
      position: relative;
      top: 0px;
      right: 0px;
      z-index: 0;
      height: 500px;
   }

   background-color: #f0f0f0;
   position: fixed;
   top: 200px;
   right: 30px;
   height: 700px;
   overflow-y: scroll;
   border-radius: 10px;
   padding: 10px 10px;
   z-index: 20;
`;

const TierTableBox = styled.div`
   display: flex;
   flex-direction: column;
`;

const TierTableWrapper = styled.div`
   display: flex;
   gap: 10px;
   align-items: center;
   border-bottom: 1px solid #ddd;

   @media screen and (max-width: 1800px) {
      > h2 {
         width: 90%;
      }
   }
`;

const textArr = [
   '진짜 마크를 처음 해 본 사람',
   '그냥 뉴비',
   '큰데 눕인 사람',
   '눕프핵의 취지에 가장 맞는 눕',
   '눕도 아니고 프로도 아닌 그 중간 어딘가인 사람',
   '계륵들 중 프로로 추천할 만한 사람',
   '잘 만드는 사람',
   '크기는 해커인데 디테일이 프로라서 차라리 그냥 작게 만들었으면 더 프로답고 좋았을 텐데.. 라는 느낌이드는 사람 ',
   '노력도는 국밥인데 느낌스는 프로인 사람',
   '프로와 해커 사이 정도의 실력을 갖춘 사람',
   '이 사람 그냥 해커나 마찬가지인데 왠지 해커들 사이에 놓으면 또 해커는 아니라서 미치겠는 사람 (프로로 가면 눕프핵 밸런스 개망치고 해커로 가면 감동을 망쳐서 결국 컨텐츠를 시원하게 말아먹게 되는)',
   '크기와 디테일이 모두 좋고 색감 혹은 연출 까지 다 잘하는 진짜 고수',
   '실력은 거의 마카게에 근접해서 열심히 하면 마카게 갈수도 있는데 우승할 주제 고르기보다 자기가 만들고 싶은거 무조건 만들어야 되서 결국 자기가 만들고 싶은거 자주 만들다보니 평균 점수가 마카게에 닿지 않아서 결국 마카게로 못올라가고 있는 사람  (실력은 진짜 주제 잘고르고 포텐 터지면 마카게급 만들어내는 사람이긴 함) 혹은 해커와 마카게 사이인 사람',
   '실력은 말 할 것도 없고 여러가지 새로운 도전으로 감동까지 주는 사람',
];

export default function Page() {
   const data = useQueryPlacementTestApplying();

   const [count, setCount] = useState(0);

   if (!data)
      return (
         <CommonLayout>
            <Skeleton width="120px" height="30px" />
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="100%" aspectRatio="16/9" borderRadius="10px" />
               ))}
            </SkeletonBox>
         </CommonLayout>
      );

   return (
      <Layout>
         <Title>
            <TextBox
               text={'시즌 4 배치고사'}
               fontSize="24px"
               lineHeight="36px"
               fontWeight="500"
               margin="0px 0px 30px 0px"
            />
         </Title>
         <TierTableContainer>
            <TierTableBox>
               {createTierArray()
                  .reverse()
                  .slice(1)
                  .map((tier, index) => (
                     <TierTableWrapper key={tier}>
                        <TierTableImageBox style={{ backgroundImage: `url(${tierImage(tier).src})` }}>
                           <TextBox
                              text={tier}
                              textShadow="1px 1px 1px black"
                              fontSize="16px"
                              lineHeight="24px"
                              fontWeight="500"
                              textAlign="center"
                              color="white"
                           />
                        </TierTableImageBox>
                        <TextBox text={textArr[index]} width="400px" fontSize="15px" />
                     </TierTableWrapper>
                  ))}
            </TierTableBox>
         </TierTableContainer>
         <ButtonWrapper>
            <Button
               backgroundColor="#333"
               hoverBackgroundColor="#888"
               padding="12px 25px"
               text="이전"
               onClick={() => setCount(prev => prev - 1)}
            />
            <CountBox>
               <TextBox text={count + 1 + ' / ' + data.length} fontWeight="500" />
            </CountBox>
            <Button
               backgroundColor="#333"
               hoverBackgroundColor="#888"
               padding="12px 25px"
               text="다음"
               onClick={() => setCount(prev => prev + 1)}
            />
         </ButtonWrapper>
         <Container>
            {data
               .sort((a, b) => a.order - b.order)
               .map((architect, index) => (
                  <ArchitectBox count={count} index={index} key={architect.minecraft_id + index}>
                     <ProfileBox>
                        <Wrapper>
                           <TierImageBox style={{ backgroundImage: `url(${tierImage(currentTier(architect)).src})` }}>
                              <TextBox
                                 text={currentTier(architect)}
                                 textShadow="1px 1px 1px black"
                                 fontSize="18px"
                                 lineHeight="24px"
                                 fontWeight="500"
                                 textAlign="center"
                                 color="white"
                              />
                           </TierImageBox>
                           <IdBox>
                              <TextBox
                                 text={architect.minecraft_id}
                                 fontSize="20px"
                                 lineHeight="32px"
                                 fontWeight="500"
                              />
                              <TextBox
                                 text={architect.wakzoo_id}
                                 fontSize="18px"
                                 lineHeight="24px"
                                 fontWeight="400"
                                 color="#535353"
                              />
                           </IdBox>
                        </Wrapper>
                        <LinkBox onClick={() => window.open(architect.cafe_url)}>
                           <Image src={cafe} width={50} alt="네이버 카페 아이콘" />
                           <TextBox text="신청글 링크" />
                        </LinkBox>
                     </ProfileBox>
                     <Portfolio info={architect} />
                  </ArchitectBox>
               ))}
         </Container>
      </Layout>
   );
}
