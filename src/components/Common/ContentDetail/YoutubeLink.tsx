import { BsLink45Deg } from 'react-icons/bs';
import styled from 'styled-components';
import TextBox from '../TextBox';

const Layout = styled.span<{ isIconOnImage?: boolean }>`
   position: ${props => (props.isIconOnImage ? 'absolute' : '')};
   top: ${props => (props.isIconOnImage ? '8px' : '')};
   right: ${props => (props.isIconOnImage ? '8px' : '')};
   background-color: ${props => (props.isIconOnImage ? 'rgba(0,0,0,0.6)' : '')};
   z-index: 5;
   display: ${props => (props.isIconOnImage ? 'none' : 'flex')};
   justify-content: ${props => (props.isIconOnImage ? 'center' : 'start')};
   align-items: center;
   width: 30px;
   height: 30px;
   border-radius: 8px;

   :hover {
      background-color: ${props => (props.isIconOnImage ? 'rgba(0,0,0,1)' : '')};
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
   }

   > svg {
      z-index: 3;
      font-size: 1.6rem;
      color: ${props => (!props.isIconOnImage ? '#777' : 'white')};

      :hover {
         cursor: pointer;
         color: ${props => (!props.isIconOnImage ? '#333' : 'white')};
      }
   }

   :hover > div {
      display: ${props => (props.isIconOnImage ? 'flex' : 'none')};
   }
`;

const Popup = styled.div`
   display: none;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 0px;
   right: 25px;
   width: 100px;
   padding: 3px 3px;
   background-color: rgba(0, 0, 0, 1);
   color: white;
   border-radius: 8px;
   border-top-right-radius: 0px;
   border-bottom-right-radius: 0px;
`;

type Props = {
   isIconOnImage?: boolean;
   isHover?: boolean;
   handleMouseOver?: (boolean: boolean) => void;
   url: string;
};

export default function YoutubeLink(props: Props) {
   const { url, isIconOnImage, handleMouseOver } = props;

   const handleClick = (e: React.MouseEvent<SVGAElement> & React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      return window.open(url);
   };

   if (url === 'null') {
      return <Layout isIconOnImage={isIconOnImage}></Layout>;
   }

   return (
      <Layout
         isIconOnImage={isIconOnImage}
         onMouseOver={() => {
            if (!handleMouseOver) return;
            handleMouseOver(true);
         }}
         onMouseLeave={() => {
            if (!handleMouseOver) return;
            handleMouseOver(false);
         }}
      >
         <BsLink45Deg onClick={handleClick} />
         <Popup onClick={handleClick}>
            <TextBox text="유튜브로 이동" fontSize="14px" />
         </Popup>
      </Layout>
   );
}
