import Image from 'next/image';
import styled from 'styled-components';

import { renameTo1080Webp } from '@/domain/noobProHacker';
import { Worldcup } from '@/domain/worldcup';

const ImageBox = styled.div`
   position: relative;
   width: 1200px;
   margin: 0px auto;
   aspect-ratio: 16/9;
   transition-duration: 200ms;
   overflow: hidden;

   > img:hover {
      scale: 1.02;
      cursor: pointer;
      transition-duration: 200ms;
   }
`;

export default function Winner({ curRoundArr }: { curRoundArr: Worldcup[] }) {
   return (
      <ImageBox>
         <Image
            priority
            sizes="1600px"
            fill
            alt="NoobProHacker Image"
            src={renameTo1080Webp(curRoundArr[0].workInfo.image_url)}
         />
      </ImageBox>
   );
}
