import Image from 'next/image';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

import TextBox from '@/components/Common/TextBox';
import { usePlayWorldCup } from '@/application/playWorldCup';
import Loading from '@/components/Worldcup/Loading';
import SetRoundOfNumber from '@/components/Worldcup/SetRoundOfNumber';
import Winner from '@/components/Worldcup/Winner';
import { Button } from '@/components/Common/Button';
import ImageInfo from '@/components/Common/ImageInfo';
import { renameTo1080Webp } from '@/domain/noobProHacker';

const Layout = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   padding-top: 130px;
   height: 100vh;
   background-color: #0f0f0f;

`;

const MainLayout = styled.div`
   display: flex;
   width: 100%;
   height: calc(100% - 150px);
   flex-direction: column;
   justify-content: center;
`;

const Main = styled.div`
   width: 1400px;
   height: auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 0px auto;
   color: white;

   @media screen and (max-width: 1600px) {
      width: 90%;
   }

   @media screen and (max-width: 1000px) {
      width: 100%;
   }
`;

const ImageBox = styled.div<{ clickedNumber: number; curRound: number; index: number }>`
   display: ${props => (props.index < (props.curRound + 1) * 2 && props.index >= props.curRound * 2 ? 'flex' : 'none')};
   position: relative;
   width: 680px;
   height: 680px;
   transition-duration: 200ms;

   > img:hover {
      scale: 1.01;
      cursor: pointer;
      transition-duration: 200ms;
   }

   scale: ${props => (props.clickedNumber === props.index ? '1.1' : '1')};
   z-index: ${props => (props.clickedNumber === props.index ? '3' : '1')};

   @media screen and (max-width: 1600px) {
      width: 48%;
      height: 50vh;
   }

   @media screen and (max-width: 1000px) {
      width: 49%;
      height: 35vh;
   }
`;

const TextWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   width: 1400px;
   margin: 0px auto;
   margin-bottom: 20px;

   @media screen and (max-width: 1600px) {
      width: 90%;
   }
`;

const YoutubeLayout = styled.div`
   position: absolute;
   z-index: 10;
   display: flex;
   justify-content: space-between;
   width: 1400px;
   top: 40%;
   left: 50%;
   transform: translate(-50%, -50%);
   margin: 0px auto;
`;

const YoutubeBox = styled.div<{ isClicked: boolean; position: 'left' | 'right' }>`
   display: ${props => (props.isClicked ? 'block' : 'none')};
   position: absolute;
   width: 680px;
   left: ${props => (props.position === 'left' ? '0px' : '')};
   right: ${props => (props.position === 'right' ? '0px' : '')};
   transition-duration: 200ms;
`;

export default function WorldCup() {
   const {
      isLoading,
      page,
      roundOfNumber,
      curRound,
      clickedNumber,
      curRoundArr,
      playing,
      setPage,
      setRoundOfNumber,
      handleImageClick,
      handleYoutubeClick,
      preloadNextRound,
   } = usePlayWorldCup();

   const router = useRouter();

   if (isLoading)
      return (
         <Layout>
            <Loading />
         </Layout>
      );

   if (page == 0) {
      return (
         <Layout>
            <SetRoundOfNumber roundOfNumber={roundOfNumber} setRoundOfNumber={setRoundOfNumber} setPage={setPage} />
         </Layout>
      );
   } else if (page == 1) {
      return (
         <Layout>
            <MainLayout>
               <TextWrapper>
                  <TextBox
                     text={curRoundArr.length === 1 ? '우승' : curRoundArr.length + '강'}
                     fontSize="32px"
                     lineHeight="48px"
                     color="white"
                     fontWeight="500"
                  />
                  <TextBox
                     text={curRoundArr.length === 1 ? '' : `(${curRound + 1}/${curRoundArr.length / 2})`}
                     fontSize="22px"
                     lineHeight="32px"
                     color="#ccc"
                     margin="8px 0px 0px 0px"
                  />
                  <Button text="다시 하기" onClick={() => router.reload()} padding="5px 8px" margin="9px 0px 0px 5px" />
                  {curRoundArr.length === 1 ? (
                     <Button
                        text="랭킹 보기"
                        onClick={() => router.push('/worldcup/ranking')}
                        padding="5px 8px"
                        margin="9px 0px 0px 5px"
                     />
                  ) : (
                     ''
                  )}
               </TextWrapper>
               <Main>
                  {curRoundArr.length === 1 ? (
                     <Winner curRoundArr={curRoundArr} />
                  ) : (
                      preloadNextRound(curRoundArr).map((item, index) => (
                        <ImageBox
                           clickedNumber={clickedNumber}
                           curRound={curRound}
                           index={index}
                           key={item.workInfo.subject}
                           onClick={() => handleImageClick(item, index)}
                        >
                           <Image
                              priority
                              sizes="1600px"
                              fill
                              style={{ objectFit: 'cover' }}
                              alt="NoobProHacker Image"
                              src={renameTo1080Webp(item.workInfo.image_url)}
                           />
                           <ImageInfo
                              isWorldCup={true}
                              episode={item.workInfo.episode}
                              subject={item.workInfo.subject}
                              onClick={() => handleYoutubeClick(index)}
                              minecraft_id={item.workInfo.minecraft_id}
                           />
                        </ImageBox>
                     ))
                  )}
               </Main>
               <YoutubeLayout>
                  <YoutubeBox position="left" isClicked={playing.leftPlayer}>
                     <ReactPlayer
                        playing={playing.leftPlayer}
                        controls
                        width="100%"
                        url={curRoundArr[curRound * 2].workInfo.youtube_url}
                     />
                  </YoutubeBox>
                  {curRoundArr.length !== 1 && (
                     <YoutubeBox position="right" isClicked={playing.rightPlayer}>
                        <ReactPlayer
                           playing={playing.rightPlayer}
                           controls
                           width="100%"
                           url={curRoundArr[curRound * 2 + 1].workInfo.youtube_url}
                        />
                     </YoutubeBox>
                  )}
               </YoutubeLayout>
            </MainLayout>
         </Layout>
      );
   }
}
