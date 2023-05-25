import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import TextBox from '@/components/Common/TextBox';
import { usePlayWorldCup } from '@/application/playWorldCup';
import { renameTo1080Webp, renameToWebp } from '@/services/noobProHackerAdapters';
import { Button } from '@/components/Common/Button';

const Layout = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 100vh;
   background-color: #0f0f0f;
`;

const Main = styled.div`
   display: flex;
   justify-content: space-between;
   width: 1400px;
   margin: 0px auto;
   color: white;
`;

const ImageBox = styled.div<{ clickedNumber: number; curRound: number; index: number }>`
   display: ${props => (props.index < (props.curRound + 1) * 2 && props.index >= props.curRound * 2 ? 'flex' : 'none')};
   position: relative;
   width: 680px;
   height: 680px;
   transition-duration: 200ms;
   overflow: hidden;

   > img:hover {
      scale: 1.02;
      cursor: pointer;
      transition-duration: 200ms;
   }

   scale: ${props => (props.clickedNumber === props.index ? '1.2' : '1')};
   z-index: ${props => (props.clickedNumber === props.index ? '3' : '1')};
`;

const InfoLayout = styled.div`
   position: absolute;
   display: flex;
   justify-content: center;
   width: 100%;
   bottom: 20px;
`;

const InfoBox = styled.div`
   display: flex;
   gap: 15px;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.8);
   padding: 2px 15px;
   border-radius: 10px;
`;

const YoutubeLink = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;

   :hover {
      cursor: pointer;
      scale: 1.02;
   }

   > svg {
      z-index: 3;
      padding-top: 3px;
      font-size: 2.7rem;
      color: red;
   }

   ::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: white;
   }
`;

const TextWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   width: 1400px;
   margin: 0px auto;
   margin-bottom: 20px;
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
   width: 680px;
   position: absolute;
   left: ${props => (props.position === 'left' ? '0px' : '')};
   right: ${props => (props.position === 'right' ? '0px' : '')};

   transition-duration: 200ms;
`;

export default function WorldCup() {
   const {
      page,
      setPage,
      round,
      setRound,
      curRound,
      setIsOriginal,
      isOriginal,
      handleImageClick,
      clickedNumber,
      handleYoutubeClick,
      curRoundArr,
      leftState,
      rightState,
   } = usePlayWorldCup();

   if (curRoundArr.length === 0)
      return (
         <Layout>
            <TextWrapper>
               <TextBox text={'로딩중'} fontSize="32px" lineHeight="48px" color="white" fontWeight="500" />
            </TextWrapper>
         </Layout>
      );

   if (page == 0) {
      return (
         <Layout>
            <TextWrapper>
               <select value={round} onChange={e => setRound(parseInt(e.target.value))}>
                  <option key={128} value={128}>
                     128
                  </option>
                  <option key={64} value={64}>
                     64
                  </option>
                  <option key={32} value={32}>
                     32
                  </option>
                  <option key={16} value={16}>
                     16
                  </option>
               </select>
               <Button text="시작" padding="8px 14px" onClick={() => setPage(1)} />
            </TextWrapper>
         </Layout>
      );
   } else if (page == 1) {
      return (
         <Layout>
            <TextWrapper>
               <TextBox
                  text={curRoundArr.length + '강'}
                  fontSize="32px"
                  lineHeight="48px"
                  color="white"
                  fontWeight="500"
               />
               <TextBox
                  text={`(${curRound + 1}/${curRoundArr.length / 2})`}
                  fontSize="22px"
                  lineHeight="32px"
                  color="#ccc"
                  margin="8px 0px 0px 0px"
               />
            </TextWrapper>
            <Main>
               {curRoundArr
                  .filter((_, index) => index < (curRound + 1) * 4)
                  .map((item, index) => (
                     <ImageBox
                        clickedNumber={clickedNumber}
                        curRound={curRound}
                        index={index}
                        key={item.subject}
                        onClick={() => handleImageClick(item, index)}
                     >
                        <Image
                           priority
                           sizes="1600px"
                           fill
                           style={{ objectFit: 'cover' }}
                           alt="NoobProHacker Image"
                           src={renameTo1080Webp(item.image_url)}
                        />
                        <InfoLayout>
                           <InfoBox onClick={e => e.stopPropagation()}>
                              <YoutubeLink onClick={() => handleYoutubeClick(index)}>
                                 <BsYoutube />
                              </YoutubeLink>
                              <TextBox text={`${item.episode}회 : ` + item.subject} fontSize="20px" lineHeight="32px" />
                              <TextBox text={item.minecraft_id} fontSize="18px" lineHeight="24px" color="#BABABA" />
                           </InfoBox>
                        </InfoLayout>
                     </ImageBox>
                  ))}
            </Main>
            <YoutubeLayout>
               <YoutubeBox position="left" isClicked={leftState}>
                  <ReactPlayer playing={leftState} controls width="100%" url={curRoundArr[curRound * 2].youtube_url} />
               </YoutubeBox>
               <YoutubeBox position="right" isClicked={rightState}>
                  <ReactPlayer
                     playing={rightState}
                     controls
                     width="100%"
                     url={curRoundArr[curRound * 2 + 1].youtube_url}
                  />
               </YoutubeBox>
            </YoutubeLayout>
         </Layout>
      );
   }
}
