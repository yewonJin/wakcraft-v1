import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';
import { useEffect } from 'react';
import Youtube from 'react-youtube';

import TextBox from '@/components/Common/TextBox';
import { getStartTime, getVideoId, usePlayWorldCup } from '@/application/playWorldCup';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 100vh;
   background-color: #0f0f0f;
`;

const Main = styled.div`
   display: flex;
   justify-content: space-between;
   width: 1200px;
   margin: 0px auto;
   color: white;
`;

const ImageBox = styled.div<{ clickedNumber: number; index: number }>`
   position: relative;
   width: 580px;
   height: 600px;
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
   width: 1200px;
   margin: 0px auto;
   margin-bottom: 20px;
`;

const YoutubeBox = styled.div<{ isClicked: boolean; index: number }>`
   position: absolute;
   transform: ${props => (props.isClicked ? 'translateY(150px)' : 'translateY(600px)')};
   transition-duration: 200ms;
`;

export default function WorldCup() {
   const { handleImageClick, page, clickedNumber, handleYoutubeClick, curRound, onReadyPlayer, leftState, rightState } =
      usePlayWorldCup();

   if (curRound.length === 0) return <div>loading</div>;

   return (
      <Layout>
         <TextWrapper>
            <TextBox text={curRound.length + '강'} fontSize="32px" lineHeight="48px" color="white" fontWeight="500" />
            <TextBox
               text={`(${page + 1}/${curRound.length / 2})`}
               fontSize="22px"
               lineHeight="32px"
               color="#ccc"
               margin="8px 0px 0px 0px"
            />
         </TextWrapper>
         <Main>
            {curRound
               .filter((_, index) => index < (page + 1) * 2 && index >= page * 2)
               .map((item, index) => (
                  <ImageBox
                     clickedNumber={clickedNumber}
                     index={index}
                     key={index}
                     onClick={() => handleImageClick(item, index)}
                  >
                     <Image
                        sizes="1200px"
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="NoobProHacker Image"
                        src={item.image_url}
                     />
                     <YoutubeBox isClicked={index === 0 ? leftState : rightState} index={index}>
                        <Youtube
                           onReady={e => onReadyPlayer(e.target, index)}
                           key={item.youtube_url}
                           videoId={getVideoId(item.youtube_url)}
                           opts={{ width: '580', playerVars: { start: getStartTime(item.youtube_url) } }}
                        />
                     </YoutubeBox>
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
      </Layout>
   );
}
