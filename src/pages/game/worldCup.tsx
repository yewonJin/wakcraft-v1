import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Youtube from 'react-youtube';

import TextBox from '@/components/Common/TextBox';
import { WorldCupItem, convertToWorldCupArray, useQueryWorldCup } from '@/services/worldCupAdapters';

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
   const [page, setPage] = useState(0);
   const [clickedNumber, setClickedNumber] = useState(-1);
   const [curArr, setCurArr] = useState<WorldCupItem[]>([]);
   const [nextArr, setNextArr] = useState<WorldCupItem[]>([]);

   const [leftPlayer, setLeftPlayer] = useState();
   const [leftState, setLeftState] = useState(false);

   const [rightPlayer, setRightPlayer] = useState();
   const [rightState, setRightState] = useState(false);

   const data = useQueryWorldCup();

   // 128강으로 만들려면 slice()랑 sort() 위치 바꿔야함
   useEffect(() => {
      if (!data) return;

      setCurArr(
         convertToWorldCupArray(data)
            .reverse()
            .sort(() => Math.random() - 0.5)
            .slice(0, 16),
      );
   }, [data]);

   if (!data) return <div>loading</div>;

   return (
      <Layout>
         <TextWrapper>
            <TextBox text={curArr.length + '강'} fontSize="32px" lineHeight="48px" color="white" fontWeight="500" />
            <TextBox
               text={`(${page + 1}/${curArr.length / 2})`}
               fontSize="22px"
               lineHeight="32px"
               color="#ccc"
               margin="8px 0px 0px 0px"
            />
         </TextWrapper>
         <Main>
            {curArr
               .filter((_, index) => index < (page + 1) * 2 && index >= page * 2)
               .map((item, index) => (
                  <ImageBox
                     clickedNumber={clickedNumber}
                     index={index}
                     key={index}
                     onClick={e => {
                        if (curArr.length === 2) {
                           setNextArr([...nextArr, item]);

                           console.log('우승');
                        }

                        if (page * 2 >= curArr.length - 2) {
                           setCurArr([...nextArr, item].sort(() => Math.random() - 0.5));

                           setNextArr([]);
                           setPage(0);
                           return;
                        }

                        setNextArr([...nextArr, item]);

                        setClickedNumber(index);

                        setTimeout(() => {
                           setClickedNumber(-1);
                        }, 500);

                        setTimeout(() => {
                           setPage(prev => prev + 1);
                        }, 700);
                     }}
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
                           onReady={e => {
                              if (index === 0) setLeftPlayer(e.target);
                              else if (index === 1) setRightPlayer(e.target);
                           }}
                           key={item.youtube_url}
                           videoId={item.youtube_url.split('/')[3].split('?')[0]}
                           opts={{ width: '580', playerVars: { start: item.youtube_url.split('=')[1] } }}
                        />
                     </YoutubeBox>
                     <InfoLayout>
                        <InfoBox onClick={e => e.stopPropagation()}>
                           <YoutubeLink
                              onClick={() => {
                                 if (!leftPlayer || !rightPlayer) return;

                                 if (index === 0) {
                                    setLeftState(prev => !prev);

                                    if (leftState) {
                                       leftPlayer.pauseVideo();
                                    } else {
                                       leftPlayer.playVideo();
                                    }
                                 } else {
                                    setRightState(prev => !prev);
                                    if (rightState) {
                                       rightPlayer.pauseVideo();
                                    } else {
                                       rightPlayer.playVideo();
                                    }
                                 }
                              }}
                           >
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
