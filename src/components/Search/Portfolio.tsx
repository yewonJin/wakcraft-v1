import Image from 'next/image';
import styled from 'styled-components';
import { BsYoutube } from 'react-icons/bs';

import { translateTier } from '@/utils/lib';
import { Architect } from '@/domain/architect';
import TextBox from '../Common/TextBox';
import { useState } from 'react';

const Layout = styled.div`
   width: 100%;
   margin-top: 20px;
`;

const PortFolioLayout = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 12px;
   gap: 30px;
   row-gap: 50px;
`;

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
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

const ContentLayout = styled.div`
   display: flex;
   gap: 20px;
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

const ContentBox = styled.div`
   display: flex;
   gap: 2px;
   flex-direction: column;
   justify-content: center;
   padding: 0px 30px;
   border-right: 1px solid #cacaca;
   border-left: 1px solid #cacaca;
`;

const RankingBox = styled.div`
   display: flex;
   gap: 2px;
   flex-direction: column;
   justify-content: center;
`;

const ContentList = styled.ul`
   display: flex;
   gap: 20px;
`;

const ContentItem = styled.li`
   list-style: none;
`;

export default function Portfolio({ info }: { info: Architect }) {
   const [contentState, setContentState] = useState(0);

   return (
      <Layout>
         <ContentList>
            {['눕프로해커', '배치고사'].map((item, index) => (
               <ContentItem key={item} onClick={() => setContentState(index)}>
                  <TextBox text={item} fontSize="20px" lineHeight="32px" fontWeight="500" />
               </ContentItem>
            ))}
         </ContentList>
         {contentState === 0 ? (
            <PortFolioLayout>
               {info.portfolio.noobProHacker.map((item, index) => {
                  return (
                     <PortFolioBox key={'noobProHacker_' + index}>
                        <ImageBox onClick={() => window.open(item.image_url)}>
                           <Image fill sizes="400px" alt="noobProHacker image" src={item.image_url} />
                           <YoutubeLink>
                              <BsYoutube
                                 onClick={e => {
                                    e.stopPropagation();
                                    return window.open(item.youtube_url);
                                 }}
                              />
                           </YoutubeLink>
                        </ImageBox>
                        <ContentLayout>
                           <TierBox tier={item.line}>{translateTier(item.line)}</TierBox>
                           <ContentBox>
                              <TextBox text={item.subject} fontSize="18px" lineHeight="24px" fontWeight="500" />
                              <TextBox
                                 text={`제 ${item.episode}회 눕프핵`}
                                 fontSize="16px"
                                 lineHeight="24px"
                                 color="#646464"
                              />
                           </ContentBox>
                           <RankingBox>
                              <TextBox text="순위" fontSize="18px" fontWeight="500" lineHeight="24px" />
                              <TextBox
                                 text={'개인 : ' + item.ranking + '위'}
                                 fontSize="16px"
                                 lineHeight="24px"
                                 color="#646464"
                              />
                           </RankingBox>
                        </ContentLayout>
                     </PortFolioBox>
                  );
               })}
            </PortFolioLayout>
         ) : (
            <PortFolioLayout>
               {info.portfolio.placementTest.sort((a, b) => a.season - b.season).map((item, index) => {
                  return (
                     <PortFolioBox key={'placementTest_' + index}>
                        <ImageBox onClick={() => window.open(item.image_url)}>
                           <Image fill sizes="400px" alt="noobProHacker image" src={item.image_url} />
                        </ImageBox>
                        <ContentLayout>
                           <ContentBox>
                              <TextBox
                                 text={item.placement_result}
                                 fontSize="18px"
                                 lineHeight="24px"
                                 fontWeight="500"
                              />
                              <TextBox
                                 text={`제 ${item.season}회 배치고사`}
                                 fontSize="16px"
                                 lineHeight="24px"
                                 color="#646464"
                              />
                           </ContentBox>
                        </ContentLayout>
                     </PortFolioBox>
                  );
               })}
            </PortFolioLayout>
         )}
      </Layout>
   );
}
