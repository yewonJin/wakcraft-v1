import styled from 'styled-components';
import { BsYoutube } from 'react-icons/bs';

import TextBox from './TextBox';

const InfoLayout = styled.div<{isWorldCup?: boolean}>`
   position: absolute;
   display: flex;
   justify-content: center;
   width: 100%;
   bottom: 20px;

   @media screen and (max-width: 1000px) {
      bottom: ${props => props.isWorldCup ? '-80px': '10px'};      
   }
`;

const InfoBox = styled.div<{isWorldCup?: boolean}>`
   display: flex;
   gap: 15px;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.8);
   padding: 2px 15px;
   border-radius: 10px;

   @media screen and (max-width: 1000px) {
      padding: ${props => props.isWorldCup ? '8px 15px' : ''};
      gap: ${props => props.isWorldCup ? '2px' : '15px'};
      flex-direction: ${props => props.isWorldCup ? 'column' : ''};


      > h2:nth-child(2) {
         font-size: 16px;
         line-height: 24px;
      }
      > h2:nth-child(3) {
         font-size: 14px;
         line-height: 24px;
      }

      > span {
         display: ${props => props.isWorldCup ? 'none': 'flex'};
      }
   }
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

   @media screen and (max-width: 1000px) {      
      > svg {
         font-size: 2.2rem;
      }
   }
`;

type Props = {
   episode: number;
   subject: string;
   minecraft_id: string;
   onClick: () => void;
   isWorldCup?: boolean;
};

export default function ImageInfo(props: Props) {
   const { episode, subject, minecraft_id, onClick, isWorldCup } = props;


   return (
      <InfoLayout isWorldCup={isWorldCup}>
         <InfoBox onClick={e => e.stopPropagation()} isWorldCup={isWorldCup}>
            <YoutubeLink onClick={e => onClick()}>
               <BsYoutube />
            </YoutubeLink>
            <TextBox text={`${episode}회 : ${subject}`} fontSize="20px" lineHeight="32px" color="white" />
            <TextBox text={minecraft_id} fontSize="18px" lineHeight="24px" color="#BABABA" />
         </InfoBox>
      </InfoLayout>
   );
}
