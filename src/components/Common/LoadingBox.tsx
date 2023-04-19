import styled from 'styled-components';
import Loading from './Loading';
import TextBox from './TextBox';

const LoadingLayout = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   padding-bottom: 10%;
   z-index: 10;
   background-color: rgba(31, 31, 31, 0.5);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 20px;
`;

type LoadingBoxType = {
   text: string;
};

export default function LoadingBox(props: LoadingBoxType) {
   return (
      <LoadingLayout>
         <Loading color="white" />
         <TextBox text={props.text} color="white" fontSize="24px" fontWeight="500" lineHeight="36px" />
      </LoadingLayout>
   );
}
