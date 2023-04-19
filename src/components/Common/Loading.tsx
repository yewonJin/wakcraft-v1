import styled from 'styled-components';

const Container = styled.div<{ color: string }>`
   display: inline-block;
   position: relative;
   width: 60px;
   height: 60px;
   margin-right: 20px;

   div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 60px;
      height: 60px;
      margin: 8px;
      border: 6px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${props => props.color + ' transparent transparent transparent'};
   }

   div:nth-child(1) {
      animation-delay: -0.45s;
   }

   div:nth-child(2) {
      animation-delay: -0.3s;
   }

   div:nth-child(3) {
      animation-delay: -0.15s;
   }

   @keyframes lds-ring {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;

type LoadingType = {
   color: string;
};

function Loading(props: LoadingType) {
   return (
      <Container color={props.color}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </Container>
   );
}

export default Loading;
