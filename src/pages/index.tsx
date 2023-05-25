import Head from 'next/head';
import styled from 'styled-components';
import { Fragment, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import bg from '../../public/assets/images/main/main-bg.webp';
import connectMongo from '@/utils/connectMongo';
import NoobProHacker from '@/models/noobProHacker';
import TextBox from '@/components/Common/TextBox';
import { translateTier } from '@/utils/lib';
import { lineWinnerIndex } from '@/domain/noobProHacker';
import { renameToWebp } from '@/services/noobProHackerAdapters';

const Layout = styled.main``;

const ContentBox = styled.main`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   box-sizing: border-box;
   width: 100%;
   height: 100vh;
   z-index: 2;

   @media screen and (max-width: 1000px) {
      height: auto;
      padding-top: 130px;
   }

   @media screen and (max-width: 800px) {
      padding-top: 100px;
   }

   @media screen and (max-height: 900px) {
      padding-top: 100px;
      height: auto;
   }
`;

const BackgroundImage = styled.div<{ bg: StaticImageData }>`
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0px;
   left: 0px;
   z-index: -1;
   background-image: ${props => `url(${props.bg.src})`};
   background-color: rgba(0, 0, 0, 0.6);
   background-size: cover;
   background-position: center;
   background-blend-mode: darken;
   filter: blur(2px);

   @media screen and (max-width: 1000px) {
      background-image: none;
      background-color: white;
   }
`;

const ContentNav = styled.div`
   display: flex;
   flex-direction: column;
   width: 1200px;
   padding-bottom: 0px;
   color: white;

   @media screen and (max-width: 1400px) {
      width: 90%;
   }

   @media screen and (max-width: 1000px) {
      > h2:first-child {
         color: #535353;
         font-size: 18px;
         line-height: 24px;
      }

      > h2:nth-child(2) {
         color: black;
         font-size: 24px;
         line-height: 36px;
      }
   }
`;

const Divider = styled.div`
   width: 1px;
   height: 29px;
   background-color: #cacaca;
`;

const Category = styled.ul`
   display: flex;
   gap: 35px;
   margin: 0px;
   margin-top: 40px;
   margin-bottom: 60px;
   font-weight: 500;

   @media screen and (max-width: 1000px) {
      margin: 22px 0px;
   }

   @media screen and (max-width: 800px) {
      gap: 15px;
      > div {
         display: none;
      }
   }
`;

const LineSubject = styled.li<{ line: number; index: number }>`
   text-align: center;
   list-style: none;
   font-size: 18px;
   color: ${props => (props.line === props.index ? 'white' : '#aaa')};
   padding-bottom: 3px;

   :hover {
      color: white;
      cursor: pointer;
   }

   @media screen and (max-width: 1000px) {
      color: ${props => (props.line === props.index ? 'black' : '#aaa')};

      :hover {
         color: black;
      }
   }

   @media screen and (max-width: 600px) {
      font-size: 14px;
   }
`;

const LineContainer = styled.div`
   width: 1200px;
   overflow: hidden;

   @media screen and (max-width: 1400px) {
      width: 90%;
   }

   @media screen and (min-width: 1000px) {
      overflow: hidden;
   }
`;

const LineList = styled.ul<{ line: number }>`
   display: flex;
   gap: 50px;
   transition-duration: 300ms;
   transform: ${props => `translateX(${props.line * -1250}px)`};

   @media screen and (max-width: 1400px) {
      width: 100%;
      height: 100%;
      gap: 0px;
      transform: ${props => `translateX(${props.line * -100}%)`};
   }
`;

const LineGroup = styled.div`
   display: flex;
   gap: 50px;
   min-width: 100%;

   @media screen and (max-width: 1000px) {
      flex-direction: column;
      gap: 10px;
   }
`;

const LineItem = styled.div`
   position: relative;
   width: 350px;
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
   background-color: rgba(255, 255, 255, 0.5);

   @media screen and (min-width: 1400px) {
      width: 350px;  
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

export const getStaticProps: GetStaticProps<{ noobProHacker: NoobProHacker[] }> = async () => {
   await connectMongo();

   const noobProHacker = await NoobProHacker.findLastestOne();

   return {
      props: {
         noobProHacker: JSON.parse(JSON.stringify(noobProHacker)),
      },
   };
};

const lineArr: ('noob' | 'pro' | 'hacker')[] = ['noob', 'pro', 'hacker'];

export default function Home({ noobProHacker }: InferGetStaticPropsType<typeof getStaticProps>) {
   const [line, setLine] = useState(lineWinnerIndex(noobProHacker[0]));

   return (
      <>
         <Head>
            <title>Wakcraft</title>
            <meta name="description" content="유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <BackgroundImage bg={bg} />
            <ContentBox>
               <ContentNav>
                  <TextBox
                     text={'제 ' + noobProHacker[0].contentInfo.episode + '회'}
                     fontSize="28px"
                     fontWeight="500"
                     lineHeight="36px"
                     margin="0px 0px 10px 0px"
                     color="#aaa"
                  />
                  <TextBox
                     text={'눕프로해커 : ' + noobProHacker[0].contentInfo.main_subject + '편'}
                     fontSize="36px"
                     fontWeight="500"
                     lineHeight="48px"
                  />
                  <Category>
                     {noobProHacker[0].lineInfo.map((item, index) => (
                        <Fragment key={item + index.toString()}>
                           <Divider />
                           <LineSubject line={line} index={index} onClick={() => setLine(index)}>
                              {item.subject}
                           </LineSubject>
                        </Fragment>
                     ))}
                     <Divider />
                  </Category>
               </ContentNav>
               <LineContainer>
                  <LineList line={line}>
                     {noobProHacker[0].lineInfo.map((item, index) => (
                        <LineGroup key={'lineInfo' + index}>
                           {lineArr.map((line, index) => (
                              <LineItem key={'line' + index}>
                                 <ImageBox onClick={() => window.open(item.line_details[line].image_url)}>
                                    <Image
                                       src={renameToWebp(item.line_details[line].image_url)}
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
                                          color="white"
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
                        </LineGroup>
                     ))}
                  </LineList>
               </LineContainer>
            </ContentBox>
         </Layout>
      </>
   );
}
