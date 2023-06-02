import Image from 'next/image';
import styled from 'styled-components';

import { WorldCupItem } from '@/services/worldcupAdapters';
import { renameTo1080Webp } from '@/domain/noobProHacker';

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

export default function Winner({ curRoundArr }: { curRoundArr: WorldCupItem[] }) {
   return (
      <ImageBox>
         <Image
            priority
            sizes="1600px"
            fill
            alt="NoobProHacker Image"
            src={renameTo1080Webp(curRoundArr[0].image_url)}
         />
      </ImageBox>
   );
}
