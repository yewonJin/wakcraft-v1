import styled from 'styled-components';
import { AiFillCaretDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useEffect } from 'react';
import Link from 'next/link';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import Skeleton from '@/components/Common/Skeleton';
import ImageBox from '@/components/Common/ContentDetail/ImageBox';
import RankingBox from '@/components/Common/ContentDetail/RankingBox';
import YoutubeLink from '@/components/Common/ContentDetail/YoutubeLink';
import { useShowEventNoobProHacker } from '@/application/showEventNoobProHacker';
import TierBox from '@/components/Common/ContentDetail/TierBox';

const SkeletonTitle = styled.div`
   margin-bottom: 80px;

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const SkeletonBox = styled.div`
   display: grid;
   grid-template-columns: repeat(3, minmax(300px, 1fr));
   margin-top: 20px;
   gap: 30px;
   row-gap: 50px;

   @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
   }

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
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

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const Main = styled.main`
   width: auto;
   margin-top: 40px;
`;

const PortfolioContainer = styled.div`
   position: relative;
   width: 1200px;
   overflow-x: hidden;

   @media screen and (max-width: 1250px) {
      width: 100%;
      margin: 0px auto;
      overflow-y: hidden;
   }

   @media screen and (max-width: 800px) {
      overflow-x: visible;
   }
`;

const PortFolioLayout = styled.div<{ linePage: number }>`
   width: 1200px;
   position: relative;
   display: flex;
   flex-direction: row-reverse;
   gap: 30px;
   transform: ${props => `translateX(${props.linePage * 410}px)`};
   transition-duration: 300ms;

   @media screen and (max-width: 1250px) {
      width: 100%;
      margin: 0px auto;
      transform: ${props => `translateX(${props.linePage * 51}%)`};
      gap: 3%;
   }

   @media screen and (max-width: 800px) {
      overflow-x: scroll;
      overflow-y: hidden;
      gap: 5%;
      padding: 0px 3%;

      ::-webkit-scrollbar {
         width: 0px;
      }

      > div:first-child {
         margin-right: 1%;
      }

      > div:last-child {
         margin-left: 1%;
      }
   }
`;

const PortFolioBox = styled.div`
   min-width: 380px;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 15px;

   @media screen and (max-width: 1250px) {
      min-width: 48%;
      margin: 0px auto;
   }

   @media screen and (max-width: 800px) {
      min-width: 98%;
      margin: 0px auto;
   }
`;

const ContentBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

const TextWrapper = styled.div<{ margin?: string }>`
   position: relative;
   display: flex;
   align-items: center;
   gap: 10px;
   margin: ${props => props.margin || ''};

   @media screen and (max-width: 800px) {
      padding: 0px 3%;
   }
`;

const Divider = styled.div`
   width: 1px;
   height: 24px;
   background-color: #ddd;
   margin: 0px 8px;
`;

const LineBox = styled.div`
   width: 1200px;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 60px;

   @media screen and (max-width: 1250px) {
      width: 100%;
   }

   @media screen and (max-width: 800px) {
      width: 100%;
   }
`;

const InfoBox = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 2px;
`;

const IdList = styled.ul<{ visible: boolean }>`
   display: ${props => (props.visible ? 'grid' : 'none')};
   grid-template-columns: repeat(3, 1fr);
   position: absolute;
   width: 380px;
   min-height: 160px;
   bottom: 68px;
   left: 50%;
   transform: translateX(-50%);
   flex-direction: column;
   gap: 8px;
   padding: 10px 10px;
   border-radius: 10px;
   background-color: rgba(32, 32, 32, 0.9);

   @media screen and (max-width: 1200px) {
      width: 100%;
   }

   > a {
      :hover {
         cursor: pointer;
         > h2 {
            color: #aaa;
         }
      }
   }
`;

const IdListButton = styled.span<{ visible: boolean }>`
   position: absolute;
   width: 16px;
   height: 16px;
   top: 28px;
   right: -20px;
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

const PageButton = styled.span<{ linePage: number; lastPage: number; direction: 'left' | 'right' }>`
   position: absolute;
   top: 130px;
   left: ${props => (props.direction === 'left' ? '-35px' : '')};
   right: ${props => (props.direction === 'right' ? '-35px' : '')};
   display: ${props =>
      (props.direction === 'left' && props.linePage === props.lastPage - 3) ||
      (props.direction === 'right' && props.linePage === 0)
         ? 'none'
         : 'flex'};
   display: ${props => (props.lastPage === 3 ? 'none' : '')};
   justify-content: center;
   align-items: center;
   width: 48px;
   height: 48px;
   border-radius: 24px;
   background-color: #ddd;
   opacity: 0.6;
   z-index: 5;

   :hover {
      cursor: pointer;
      opacity: 0.8;
   }

   > svg {
      font-size: 1.3rem;
   }

   @media screen and (max-width: 1250px) {
      display: ${props =>
         (props.direction === 'left' && props.linePage === props.lastPage - 2) ||
         (props.direction === 'right' && props.linePage === 0)
            ? 'none'
            : 'flex'};

      top: 180px;
      left: ${props => (props.direction === 'left' ? '-15px' : '')};
      right: ${props => (props.direction === 'right' ? '-15px' : '')};
   }

   @media screen and (max-width: 800px) {
      display: none;
      top: 0px;
      width: 32px;
      height: 32px;
      > svg {
         font-size: 1rem;
      }
   }
`;

export default function Page() {
   const { data, linePage, modalState, increasePage, decreasePage, toggleModal, initialize } =
      useShowEventNoobProHacker();

   useEffect(() => {
      if (!data) return;

      initialize(data);
   }, [data]);

   if (!data)
      return (
         <CommonLayout>
            <SkeletonTitle>
               <Skeleton width="120px" height="36px" />
            </SkeletonTitle>
            <SkeletonBox>
               {[...new Array(9).fill(0)].map((_, index) => (
                  <Skeleton key={'Skeleton' + index} width="100%" aspectRatio="16/9" borderRadius="10px" />
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
         <Main>
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
                  <PageButton
                     direction="left"
                     linePage={linePage[lineIndex]}
                     lastPage={linePage.length}
                     onClick={() => decreasePage(lineIndex)}
                  >
                     <AiOutlineLeft />
                  </PageButton>
                  <PageButton
                     direction="right"
                     linePage={linePage[lineIndex]}
                     lastPage={linePage.length}
                     onClick={() => increasePage(lineIndex)}
                  >
                     <AiOutlineRight />
                  </PageButton>
                  <PortfolioContainer>
                     <PortFolioLayout linePage={linePage[lineIndex]}>
                        {item.line_details
                           .slice(0)
                           .reverse()
                           .map((line, tierIndex) => (
                              <PortFolioBox key={line.minecraft_id[0]}>
                                 <ImageBox image_url={line.image_url} youtube_url={line.youtube_url} />
                                 <ContentBox>
                                    {line.minecraft_id.length > 1 && (
                                       <IdList visible={modalState[lineIndex][tierIndex]}>
                                          {line.minecraft_id.map(item => (
                                             <Link key={item} href={`/architect/${item}`}>
                                                <TextBox
                                                   text={item}
                                                   textAlign="center"
                                                   fontSize="14px"
                                                   lineHeight="24px"
                                                   fontWeight="500"
                                                   color="#ddd"
                                                />
                                             </Link>
                                          ))}
                                       </IdList>
                                    )}
                                    <TierBox tier={line.line} />
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
                                          text="건축가"
                                          textAlign="center"
                                          fontSize="16px"
                                          lineHeight="24px"
                                          color="#646464"
                                       />
                                       {line.minecraft_id.length === 1 ? (
                                          <Link href={`/architect/${line.minecraft_id}`}>
                                             <TextBox
                                                text={line.minecraft_id[0]}
                                                textAlign="center"
                                                fontSize="16px"
                                                lineHeight="24px"
                                                fontWeight="500"
                                             />
                                          </Link>
                                       ) : (
                                          <TextBox
                                             text={line.line + ' x ' + line.minecraft_id.length}
                                             textAlign="center"
                                             fontSize="16px"
                                             lineHeight="24px"
                                             fontWeight="500"
                                          />
                                       )}
                                    </InfoBox>
                                    <RankingBox ranking={line.ranking} />
                                 </ContentBox>
                              </PortFolioBox>
                           ))}
                     </PortFolioLayout>
                  </PortfolioContainer>
               </LineBox>
            ))}
         </Main>
      </CommonLayout>
   );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
   return {
      props: {},
   };
}
