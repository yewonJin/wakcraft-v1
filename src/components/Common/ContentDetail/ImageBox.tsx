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

   :hover {
      cursor: pointer;
   }

   :hover > img {
      filter: brightness(0.9);
   }

   > img {
      border-radius: 10px;
   }
`;

type Props = {
   image_url: string;
   youtube_url?: string;
};

export default function ImageBox(props: Props) {
   const { image_url, youtube_url } = props;

   return (
      <Layout onClick={() => window.open(renameTo1080Webp(image_url))}>
         <Image fill sizes="400px" alt="noobProHacker image" src={renameToWebp(image_url)} />
         {youtube_url && <YoutubeLink url={youtube_url} isIconOnImage={true} />}
      </Layout>
   );
}

/*

*/
