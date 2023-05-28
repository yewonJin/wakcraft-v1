import { BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';
import TextBox from './TextBox';
import { MouseEvent } from 'react';

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

type Props = {
   episode: number;
   subject: string;
   minecraft_id: string;
   onClick: () => void;
};

export default function ImageInfo(props: Props) {
   const { episode, subject, minecraft_id, onClick } = props;

   return (
      <InfoLayout>
         <InfoBox onClick={e => e.stopPropagation()}>
            <YoutubeLink onClick={e => onClick()}>
               <BsYoutube />
            </YoutubeLink>
            <TextBox text={`${episode}회 : ${subject}`} fontSize="20px" lineHeight="32px" color="white" />
            <TextBox text={minecraft_id} fontSize="18px" lineHeight="24px" color="#BABABA" />
         </InfoBox>
      </InfoLayout>
   );
}
