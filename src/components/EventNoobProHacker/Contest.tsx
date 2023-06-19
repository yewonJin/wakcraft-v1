import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import styled from 'styled-components';
import TextBox from '../Common/TextBox';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ImageBox from '../Common/ContentDetail/ImageBox';
import Link from 'next/link';
import RankingBox from '../Common/ContentDetail/RankingBox';

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

      ::-webkit-scrollbar {
         width: 0px;
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
      min-width: 100%;
      margin: 0px auto;
      padding: 0px 3%;
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
      width: 96%;
   }

   @media screen and (max-width: 800px) {
      width: 93%;
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

type Props = {
   data: EventNoobProHacker;
   linePage: number[];
   increasePage: (index: number) => void;
   decreasePage: (index: number) => void;
};

export default function Contest(props: Props) {
   const { data, linePage, increasePage, decreasePage } = props;

   return (
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
                                 <InfoBox>
                                    <TextBox
                                       text="주제"
                                       textAlign="center"
                                       fontSize="16px"
                                       lineHeight="24px"
                                       color="#646464"
                                    />

                                    <TextBox
                                       text={line.minecraft_id[0]}
                                       textAlign="center"
                                       fontSize="16px"
                                       lineHeight="24px"
                                       fontWeight="500"
                                    />
                                 </InfoBox>
                                 <InfoBox>
                                    <TextBox
                                       text="건축가"
                                       textAlign="center"
                                       fontSize="16px"
                                       lineHeight="24px"
                                       color="#646464"
                                    />

                                    <Link href={`/architect/${line.minecraft_id}`}>
                                       <TextBox
                                          text={line.minecraft_id[0]}
                                          textAlign="center"
                                          fontSize="16px"
                                          lineHeight="24px"
                                          fontWeight="500"
                                       />
                                    </Link>
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
   );
}
