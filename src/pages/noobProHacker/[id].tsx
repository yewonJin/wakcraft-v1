import styled from 'styled-components';

import { useQueryArchitectById } from '@/services/architectAdapters';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import { tierImage, translateTier } from '@/utils/lib';
import Portfolio from '@/components/Architect/Portfolio';
import { currentTier, numberParticipationInLine } from '@/domain/architect';
import { useQueryNoobProHacker } from '@/services/noobProHackerAdapters';
import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';
import { Fragment } from 'react';

const ProfileBox = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media screen and (max-width: 800px) {
      gap: 8px;
      align-items: start;
      flex-direction: column;
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
      grid-template-columns: repeat(1, minmax(300px, 1fr));
   }
`;

const IdBox = styled.div`
   display: flex;
   flex-direction: column;
`;

const NoobProHackerLayout = styled.div`
   margin-top: 10px;
`;

const ContentLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;
   height: 300px;
`;

const ImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
   box-shadow: 1px 1px 3px #333;
   border-radius: 10px;
   background-color: #ddd;

   :hover {
      cursor: pointer;
   }

   :hover > img {
      filter: brightness(0.9);
   }

   > img {
      border-radius: 10px;
   }
`;

const TierBox = styled.span<{ tier: string }>`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 53px;
   border-radius: 10px;
   font-size: 18px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: ${props =>
      props.tier === 'hacker' ? 'rgb(177, 41, 98)' : props.tier === 'pro' ? 'rgb(59, 157, 177)' : 'rgb(198,142,83)'};
`;

const RankingBox = styled.div`
   display: flex;
   width: 90px;
   gap: 2px;
   flex-direction: column;
   justify-content: center;
`;

const YoutubeLink = styled.span`
   position: absolute;
   top: 10px;
   right: 10px;
   border-radius: 50px;
   z-index: 5;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px;

   > svg {
      z-index: 3;
      font-size: 1.8rem;
      color: red;

      :hover {
         cursor: pointer;
         scale: 1.05;
      }
   }

   ::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: white;
   }
`;

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

export default function Page() {
   const data = useQueryNoobProHacker();

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
         <TextBox
            text={'제 ' + data.contentInfo.episode + '회'}
            fontSize="20px"
            lineHeight="32px"
            color="#646464"
            margin="0px 0px 10px 0px"
         />
         <TextBox
            text={'눕프로해커 : ' + data.contentInfo.main_subject}
            fontSize="24px"
            lineHeight="32px"
            fontWeight="500"
         />
         <NoobProHackerLayout>
            {data.lineInfo.map((item, index) => (
               <Fragment key={item.subject + index}>
                  <TextBox
                     text={index + 1 + '라인 : ' + item.subject}
                     fontSize="20px"
                     lineHeight="32px"
                     margin="20px 0px 10px 0px"
                  />
                  <ContentLayout>
                     <PortFolioBox>
                        <ImageBox onClick={() => window.open(item.line_details.noob.image_url)}>
                           <Image fill sizes="400px" alt="noobProHacker image" src={item.line_details.noob.image_url} />
                           <YoutubeLink>
                              <BsYoutube
                                 onClick={e => {
                                    e.stopPropagation();
                                    return window.open(item.line_details.noob.youtube_url);
                                 }}
                              />
                           </YoutubeLink>
                        </ImageBox>
                        <Wrapper>
                           <TierBox tier={'noob'}>{translateTier('noob')}</TierBox>
                           <IdBox>
                              <TextBox
                                 text={'마인크래프트 아이디'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                              />
                              <TextBox
                                 text={item.line_details.noob.minecraft_id}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </IdBox>
                           <RankingBox>
                              <TextBox text="순위" textAlign="center" fontSize="16px" lineHeight="24px" />
                              <TextBox
                                 text={item.line_details.noob.ranking + '위'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </RankingBox>
                        </Wrapper>
                     </PortFolioBox>
                     <PortFolioBox>
                        <ImageBox onClick={() => window.open(item.line_details.pro.image_url)}>
                           <Image fill sizes="400px" alt="noobProHacker image" src={item.line_details.pro.image_url} />
                           <YoutubeLink>
                              <BsYoutube
                                 onClick={e => {
                                    e.stopPropagation();
                                    return window.open(item.line_details.pro.youtube_url);
                                 }}
                              />
                           </YoutubeLink>
                        </ImageBox>
                        <Wrapper>
                           <TierBox tier={'pro'}>{translateTier('pro')}</TierBox>
                           <IdBox>
                              <TextBox
                                 text={'마인크래프트 아이디'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                              />
                              <TextBox
                                 text={item.line_details.pro.minecraft_id}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </IdBox>
                           <RankingBox>
                              <TextBox text="순위" textAlign="center" fontSize="16px" lineHeight="24px" />
                              <TextBox
                                 text={item.line_details.pro.ranking + '위'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </RankingBox>
                        </Wrapper>
                     </PortFolioBox>
                     <PortFolioBox>
                        <ImageBox onClick={() => window.open(item.line_details.hacker.image_url)}>
                           <Image
                              fill
                              sizes="400px"
                              alt="noobProHacker image"
                              src={item.line_details.hacker.image_url}
                           />
                           <YoutubeLink>
                              <BsYoutube
                                 onClick={e => {
                                    e.stopPropagation();
                                    return window.open(item.line_details.hacker.youtube_url);
                                 }}
                              />
                           </YoutubeLink>
                        </ImageBox>
                        <Wrapper>
                           <TierBox tier={'hacker'}>{translateTier('hacker')}</TierBox>
                           <IdBox>
                              <TextBox
                                 text={'마인크래프트 아이디'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                              />
                              <TextBox
                                 text={item.line_details.hacker.minecraft_id}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </IdBox>
                           <RankingBox>
                              <TextBox text="순위" textAlign="center" fontSize="16px" lineHeight="24px" />
                              <TextBox
                                 text={item.line_details.hacker.ranking + '위'}
                                 textAlign="center"
                                 fontSize="16px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                           </RankingBox>
                        </Wrapper>
                     </PortFolioBox>
                  </ContentLayout>
               </Fragment>
            ))}
         </NoobProHackerLayout>
      </CommonLayout>
   );
}
