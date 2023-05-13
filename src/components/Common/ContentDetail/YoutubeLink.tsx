import { BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';

const Layout = styled.span<{ onImage?: boolean }>`
   position: ${props => (props.onImage ? 'absolute' : '')};
   top: ${props => (props.onImage ? '12px' : '')};
   right: ${props => (props.onImage ? '12px' : '')};
   border-radius: 50px;
   z-index: 5;
   display: flex;
   justify-content: center;
   align-items: center;

   > svg {
      z-index: 3;
      font-size: 1.8rem;
      color: red;

      :hover {
         cursor: pointer;
         scale: 1.05;
      }
   }

   ::after {
      display: ${props => (props.onImage ? 'flex' : 'none')};
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: white;
   }
`;

type Props = {
   onImage?: boolean;
   url: string;
};

export default function YoutubeLink(props: Props) {
   const { url, onImage } = props;

   const handleClick = (e: React.MouseEvent<SVGAElement>) => {
      e.preventDefault();
      e.stopPropagation();
      return window.open(url);
   };

   return (
      <Layout onImage={onImage}>
         <BsYoutube onClick={handleClick} />
      </Layout>
   );
}
