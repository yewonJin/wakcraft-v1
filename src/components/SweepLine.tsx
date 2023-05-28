import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import TextBox from './Common/TextBox';
import { convertToSweepLine, renameTo1080Webp } from '@/domain/noobProHacker';
import { useQueryNoobProHackerSweepLine } from '@/services/noobProHackerAdapters';
import { translateTier } from '@/utils/lib';

const Layout = styled.div`
   width: 100%;
   margin-top: 120px;
   height: 800px;
`;

const Box = styled.div`
   position: relative;
   width: 1200px;
   margin: 0px auto;
`;

const List = styled.div`
   display: flex;
`;

const LineContainer = styled.div`
   display: flex;
   width: 100%;
   overflow: hidden;

   @media screen and (max-width: 1400px) {
      width: 90%;
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
   gap: 30px;
   transition-duration: 300ms;
   transform: ${props => `translateX(${props.line * -1200}px)`};

   @media screen and (max-width: 1400px) {
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

   @media screen and (max-width: 1400px) {
      width: 33%;
      height: 100%;
   }

   @media screen and (max-width: 1000px) {
      width: 100%;
      padding-bottom: 10px;
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

   @media screen and (min-width: 1400px) {
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
   top: 50%;
   left: ${props => (props.position === 'left' ? '-70px' : '')};
   right: ${props => (props.position === 'right' ? '-70px' : '')};
   transform: translateY(-50%);
   width: 48px;
   height: 48px;
   border-radius: 30px;
   background-color: #ddd;
   cursor: pointer;

   > svg {
      font-size: 1.3rem;
      color: #313131;
   }
`;

const TextWrapper = styled.div<{ margin: string }>`
   display: flex;
   gap: 10px;
   align-items: end;
   margin: ${props => props.margin || '0px'};
`;

export default function MainInfo() {
   const data = useQueryNoobProHackerSweepLine();

   const [page, setPage] = useState(0);

   if (!data) return <div>Loading</div>;

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
                                       src={renameTo1080Webp(item.line_details[line].image_url)}
                                       style={{ objectFit: 'cover' }}
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
