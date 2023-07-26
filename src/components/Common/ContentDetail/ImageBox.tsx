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

type Props = {
   image_url: string;
   youtube_url?: string;
   date?: Date;
};

export default function ImageBox(props: Props) {
   const [isHover, setIsHover] = useState(false);

   console.log(isHover);

   const handleMouseOver = (boolean: boolean) => {
      setIsHover(boolean);
   };

   const { image_url, youtube_url } = props;

   if (youtube_url === 'null') {
      return (
         <Layout onClick={() => window.open(renameTo1080Webp(image_url))}>
            <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
         </Layout>
      );
   }

   return (
      <Layout isHover={isHover} onClick={() => window.open(renameTo1080Webp(image_url))}>
         <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
         {youtube_url && (
            <YoutubeLink url={youtube_url} isIconOnImage={true} isHover={isHover} handleMouseOver={handleMouseOver} />
         )}
         <Popup>
            <TextBox text="클릭하여 원본 이미지 보기" fontSize="14px" />
         </Popup>
      </Layout>
   );
}
