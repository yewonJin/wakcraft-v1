import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import { useQueryEventNoobProHacker } from '@/services/eventNoobProHackerAdapters';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import { useState } from 'react';
import { produce } from 'immer';
import { AiFillCaretDown } from 'react-icons/ai';
import { useShowEventNoobProHacker } from '@/application/showEventNoobProHacker';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';

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

const Title = styled.div`
   display: flex;
   gap: 15px;
   align-items: center;

   > span {
      padding-top: 5px;
   }

   > span > svg {
      font-size: 2.3rem;
   }
`;

const Layout = styled.div`
   margin-top: 40px;
`;

const PortFolioLayout = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   gap: 30px;
`;

const PortFolioBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const ContentBox = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

const TierBox = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 53px;
   border-radius: 10px;
   font-size: 16px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: #414141;
`;

const TextWrapper = styled.div<{ margin?: string }>`
   display: flex;
   align-items: center;
   gap: 10px;
   margin: ${props => props.margin || ''};
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #ddd;
   margin: 0px 8px;
`;

const LineBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 60px;
`;

const InfoBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 2px;
`;

const IdList = styled.ul<{ visible: boolean }>`
   display: ${props => (props.visible ? 'flex' : 'none')};
   position: absolute;
   top: 58px;
   left: 50%;
   transform: translateX(-50%);
   flex-direction: column;
   gap: 8px;
   padding: 10px 20px;
   min-width: 160px;
   border-radius: 10px;
   background-color: #f1f1f1;
   z-index: 11;
`;

const IdListButton = styled.span<{ visible: boolean }>`
   position: absolute;
   width: 16px;
   height: 16px;
   top: 28px;
   right: 10px;
   border-radius: 8px;
   z-index: 10;

   :hover {
      cursor: pointer;
   }

   > svg {
      transition-duration: 200ms;
      transform: ${props => (props.visible ? 'rotate(180deg)' : '')};
   }
`;

const IdItem = styled.li`
   list-style: none;
`;

export default function Page() {
   const { data, modalState, toggleModal } = useShowEventNoobProHacker();

   if (!data)
      return (
         <CommonLayout>
            <ProfileBox>
               <Skeleton width="85px" height="94px" />
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
         <Title>
            <TextBox text={data.contentInfo.contentName} fontSize="28px" lineHeight="40px" fontWeight="500" />
            <YoutubeLink url={data.contentInfo.youtube_url} />
         </Title>
         <Layout>
            {data.lineInfo.map((item, lineIndex) => (
               <LineBox key={item.subject + lineIndex}>
                  <TextWrapper>
                     <TextBox
                        text={lineIndex + 1 + '라인'}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="24px"
                        color="#646464"
                     />
                     <TextBox text={item.subject} fontSize="20px" fontWeight="500" lineHeight="32px" />
                     <Divider></Divider>
                     <TextWrapper>
                        <TextBox text={item.line_ranking + '위'} fontSize="18px" fontWeight="500" lineHeight="24px" />
                     </TextWrapper>
                  </TextWrapper>
                  <PortFolioLayout>
                     {item.line_details.map((line, tierIndex) => (
                        <PortFolioBox key={line.minecraft_id[0]}>
                           <ImageBox image_url={line.image_url} youtube_url={line.youtube_url} />
                           <ContentBox>
                              {line.minecraft_id.length !== 1 && (
                                 <IdList visible={modalState[lineIndex][tierIndex]}>
                                    {line.minecraft_id.map(item => (
                                       <IdItem key={item}>
                                          <TextBox
                                             text={item}
                                             textAlign="center"
                                             fontSize="16px"
                                             lineHeight="24px"
                                             fontWeight="500"
                                             color="#313131"
                                          />
                                       </IdItem>
                                    ))}
                                 </IdList>
                              )}
                              <TierBox>{line.line}</TierBox>
                              <InfoBox>
                                 {line.minecraft_id.length !== 1 && (
                                    <IdListButton
                                       visible={modalState[lineIndex][tierIndex]}
                                       onClick={() => toggleModal(lineIndex, tierIndex)}
                                    >
                                       <AiFillCaretDown />
                                    </IdListButton>
                                 )}
                                 <TextBox
                                    text="마인크래프트 아이디"
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    color="#646464"
                                 />
                                 <TextBox
                                    text={
                                       line.minecraft_id.length === 1
                                          ? line.minecraft_id[0]
                                          : line.line + ' x ' + line.minecraft_id.length
                                    }
                                    textAlign="center"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    fontWeight="500"
                                 />
                              </InfoBox>
                              <RankingBox ranking={line.ranking} />
                           </ContentBox>
                        </PortFolioBox>
                     ))}
                  </PortFolioLayout>
               </LineBox>
            ))}
         </Layout>
      </CommonLayout>
   );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
