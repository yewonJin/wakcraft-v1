import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import TextBox from './Common/TextBox';
import { convertToSweepLine, renameTo1080Webp, renameToWebp } from '@/domain/noobProHacker';
import { useQueryNoobProHackerSweepLine } from '@/services/noobProHackerAdapters';
import { translateTier } from '@/utils/lib';
import Skeleton from './Common/Skeleton';

const Layout = styled.div`
   width: 100%;
   margin: 0px auto;
   margin-top: 120px;

   @media screen and (max-width: 1200px) {
      width: 90%;
      margin-top: 60px;
   }
`;

const Box = styled.div`
   position: relative;
   width: 1200px;
   margin: 0px auto;

   @media screen and (max-width: 1200px) {
      width: 100%;

      > h2 {
         font-size: 22px;
         line-height: 32px;
      }
   }
`;

const List = styled.div`
   display: flex;
   width: 100%;
`;

const LineContainer = styled.div`
   display: flex;
   width: 100%;
   overflow: hidden;

   @media screen and (max-width: 1200px) {
      width: 100%;
   }

   @media screen and (min-width: 1000px) {
      overflow: hidden;
   }
`;

const LineGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
   min-width: 100%;
`;

const LineList = styled.ul<{ line: number }>`
   display: flex;
   width: 100%;
   gap: 30px;
   transition-duration: 300ms;
   transform: ${props => `translateX(${props.line * -1200}px)`};

   @media screen and (max-width: 1200px) {
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 0px;
      transform: ${props => `translateX(${props.line * -100}%)`};
   }
`;

const LineItem = styled.div`
   position: relative;
   width: 380px;
   height: 500px;
   padding-bottom: 20px;

   @media screen and (max-width: 1200px) {
      width: 100%;
      height: 100%;
   }

   @media screen and (max-height: 900px) {
      height: auto;
   }
`;

const ImageBox = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 3/3.6;
   background-color: #ccc;

   @media screen and (min-width: 1200px) {
      width: 380px;
      height: 450px;
   }

   @media screen and (max-width: 1000px) {
      aspect-ratio: 16/9;
   }

   @media screen and (max-height: 900px) {
      height: auto;
   }

   > img {
      :hover {
         scale: 1.02;
         cursor: pointer;
      }
      object-fit: cover;

      @media screen and (min-width: 1400px) {
         object-fit: '';
      }
   }
`;
const lineArr: ('noob' | 'pro' | 'hacker')[] = ['noob', 'pro', 'hacker'];

const TextContainer = styled.div`
   display: flex;
   gap: 10px;
   align-items: center;
   justify-content: center;
   margin-top: 5px;
   padding-left: 15px;

   > a {
      @media screen and (max-width: 1000px) {
         > h2 {
            font-size: 16px;
            color: black;
         }
      }

      :hover > h2 {
         color: #14b3e4;
      }
   }

   > h2 {
      @media screen and (max-width: 1000px) {
         font-size: 14px;
      }
   }
`;

const ButtonBox = styled.div<{ position: 'left' | 'right'; page: number; lastPage: number }>`
   position: absolute;
   display: ${props =>
      (props.page === 0 && props.position === 'left') ||
      (props.page === props.lastPage - 1 && props.position === 'right')
         ? 'none'
         : 'flex'};
   justify-content: center;
   align-items: center;
   top: 0px;
   right: ${props => (props.position === 'right' ? '0px' : '60px')};
   width: 36px;
   height: 36px;
   border-radius: 30px;
   background-color: #ddd;
   cursor: pointer;

   > svg {
      font-size: 1rem;
      color: #313131;
   }

   @media screen and (min-width: 1400px) {
      width: 48px;
      height: 48px;
      top: 50%;
      left: ${props => (props.position === 'left' ? '-70px' : '')};
      right: ${props => (props.position === 'right' ? '-70px' : '')};
      transform: translateY(-50%);

      > svg {
         font-size: 1.3rem;
      }
   }
`;

const TextWrapper = styled.div<{ margin: string }>`
   display: flex;
   gap: 10px;
   align-items: end;
   margin: ${props => props.margin || '0px'};
`;

const SkeletonGroup = styled.div`
   display: flex;
   gap: 15px;
   min-width: 100%;
`;

export default function MainInfo() {
   const data = useQueryNoobProHackerSweepLine();

   const [page, setPage] = useState(0);

   if (!data)
      return (
         <Layout>
            <Box>
               <TextBox
                  text={'싹쓸이 라인'}
                  fontSize="26px"
                  lineHeight="40px"
                  fontWeight="500"
                  margin="0px 0px 30px 0px"
               />
               <List>
                  <LineContainer>
                     <SkeletonGroup>
                        {[...new Array(3).fill(0)].map((_, index) => (
                           <LineItem key={index}>
                              <ImageBox>
                                 <Skeleton key={'Skeleton' + index} width="100%" borderRadius="10px" />
                              </ImageBox>
                           </LineItem>
                        ))}
                     </SkeletonGroup>
                  </LineContainer>
               </List>
            </Box>
         </Layout>
      );

   return (
      <Layout>
         <Box>
            <TextBox
               text={'싹쓸이 라인'}
               fontSize="26px"
               lineHeight="40px"
               fontWeight="500"
               margin="0px 0px 30px 0px"
            />
            <List>
               <LineContainer>
                  {convertToSweepLine(data).map(item => (
                     <LineGroup key={'line_' + item.subject}>
                        <TextWrapper margin="0px">
                           <TextBox
                              text={`EP${data[page].contentInfo.episode} `}
                              fontSize="20px"
                              lineHeight="32px"
                              fontWeight="500"
                              color="#646464"
                           />
                           <TextBox
                              text={convertToSweepLine(data)[page].subject}
                              fontSize="20px"
                              lineHeight="32px"
                              fontWeight="500"
                           />
                        </TextWrapper>
                        <LineList line={page}>
                           {lineArr.map((line, index) => (
                              <LineItem key={'line' + index}>
                                 <ImageBox onClick={() => window.open(item.line_details[line].image_url)}>
                                    <Image
                                       src={renameToWebp(item.line_details[line].image_url)}
                                       fill
                                       sizes="900px"
                                       alt={line}
                                    />
                                 </ImageBox>
                                 <TextContainer>
                                    <Link href={`/architect/${item.line_details[line].minecraft_id}`}>
                                       <TextBox
                                          text={item.line_details[line].minecraft_id}
                                          fontSize="20px"
                                          lineHeight="32px"
                                          fontWeight="500"
                                       />
                                    </Link>
                                    <TextBox
                                       text={translateTier(line)}
                                       color="#aaa"
                                       fontSize="16px"
                                       lineHeight="24px"
                                       margin="3px 0px 0px 0px"
                                       fontWeight="500"
                                    />
                                 </TextContainer>
                              </LineItem>
                           ))}
                        </LineList>
                     </LineGroup>
                  ))}
               </LineContainer>
            </List>
            <ButtonBox position="left" page={page} lastPage={data.length} onClick={() => setPage(prev => prev - 1)}>
               <AiOutlineLeft />
            </ButtonBox>
            <ButtonBox position="right" page={page} lastPage={data.length} onClick={() => setPage(prev => prev + 1)}>
               <AiOutlineRight />
            </ButtonBox>
         </Box>
      </Layout>
   );
}
