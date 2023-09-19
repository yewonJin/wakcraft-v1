import Image from 'next/image';
import styled from 'styled-components';

import YoutubeLink from './YoutubeLink';
import { renameTo1080Webp, renameToWebp } from '@/domain/noobProHacker';
import TextBox from '../TextBox';
import { useState } from 'react';

const Layout = styled.div<{ isHover?: boolean }>`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
   box-shadow: 1px 1px 3px #333;
   border-radius: 10px;
   background-color: #ddd;

   > img {
      border-radius: 10px;
   }

   :hover {
      cursor: pointer;
   }

   :hover > span {
      display: flex;
   }

   :hover > div {
      display: ${props => (!props.isHover ? 'flex' : 'none')};
   }
`;

const Popup = styled.div`
   display: none;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: 4px;
   right: 8px;
   padding: 3px 10px;
   background-color: rgba(0, 0, 0, 1);
   color: white;
`;

const InfiniteTimeBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 6px;
   left: 6px;
   padding: 3px 10px;
   border-radius: 6px;
   font-size: 14px;
   background-color: rgba(0, 0, 0, 1);
   color: white;
`;

const NumberOfPeopleBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 6px;
   left: 6px;
   padding: 3px 10px;
   border-radius: 6px;
   font-size: 14px;
   background-color: rgba(0, 0, 0, 1);
   color: white;
`;

type Props = {
   image_url: string;
   youtube_url?: string;
   date?: Date;
   isInfiniteTime?: boolean;
   numberOfPeople?: number;
};

export default function ImageBox(props: Props) {
   const { image_url, youtube_url, isInfiniteTime, numberOfPeople } = props;

   const [isHover, setIsHover] = useState(false);

   const handleMouseOver = (boolean: boolean) => {
      setIsHover(boolean);
   };

   if (youtube_url === 'null') {
      return (
         <Layout onClick={() => window.open(renameTo1080Webp(image_url))}>
            <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
            <Popup>
               <TextBox text="클릭하여 원본 이미지 보기" fontSize="14px" />
            </Popup>
            {isInfiniteTime && <InfiniteTimeBox>무제한급</InfiniteTimeBox>}
            {numberOfPeople && numberOfPeople > 1 && (
               <NumberOfPeopleBox>{`${numberOfPeople}명 작품`}</NumberOfPeopleBox>
            )}
         </Layout>
      );
   }

   return (
      <Layout isHover={isHover} onClick={() => window.open(renameTo1080Webp(image_url))}>
         <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
         {youtube_url && (
            <YoutubeLink url={youtube_url} isIconOnImage={true} isHover={isHover} handleMouseOver={handleMouseOver} />
         )}
         {isInfiniteTime && <InfiniteTimeBox>무제한급</InfiniteTimeBox>}
         {numberOfPeople && numberOfPeople > 1 && <NumberOfPeopleBox>{`${numberOfPeople}명 작품`}</NumberOfPeopleBox>}
         <Popup>
            <TextBox text="클릭하여 원본 이미지 보기" fontSize="14px" />
         </Popup>
      </Layout>
   );
}
