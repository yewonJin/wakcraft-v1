import Image from 'next/image';
import styled from 'styled-components';
import YoutubeLink from './YoutubeLink';
import { renameTo1080Webp, renameToWebp } from '@/domain/noobProHacker';

const Layout = styled.div`
   position: relative;
   width: 100%;
   aspect-ratio: 16/9;
   box-shadow: 1px 1px 3px #333;
   border-radius: 10px;
   background-color: #ddd;
   border-radius: 10px;

   :hover {
      cursor: pointer;
   }

   :hover > img {
      filter: brightness(0.9);
   }
`;

type Props = {
   image_url: string;
   youtube_url?: string;
   date?: Date;
};

export default function ImageBox(props: Props) {
   const { image_url, youtube_url } = props;

   if (youtube_url === 'null') {
      return (
         <Layout onClick={() => window.open(renameTo1080Webp(image_url))}>
            <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
         </Layout>
      );
   }

   return (
      <Layout onClick={() => window.open(renameTo1080Webp(image_url))}>
         <Image fill sizes="400px" alt="작품 이미지" src={renameToWebp(image_url)} />
         {youtube_url && <YoutubeLink url={youtube_url} isIconOnImage={true} />}
      </Layout>
   );
}
