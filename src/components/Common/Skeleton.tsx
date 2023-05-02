import styled, { keyframes } from 'styled-components';

type SkeletonType = {
   [props: string]: string | boolean;
};

type SkeletonStyleType = {
   backgroundColor?: string;
   width?: string;
   height?: string;
   margin?: string;
   padding?: string;
   borderRadius?: string;
};

const loading = keyframes`
    0% {
         transform: translateX(0px);
    }
    50%,
    100% {
         transform: translateX(400px);
    }
`;

const Span = styled.span<SkeletonStyleType>`
   position: absolute;
   width: 10px;
   height: 100%;
   background-color: #d3d3d3;
   z-index: 2;
   animation: ${loading} 1.5s infinite linear;
`;

const Layout = styled.div<SkeletonStyleType>`
   position: relative;
   background-color: ${props => props.backgroundColor || '#ddd'};
   width: ${props => props.width || 'auto'};
   height: ${props => props.height || 'auto'};
   border-radius: ${props => props.borderRadius || '0px'};
   margin: ${props => props.margin || '0px'};
   padding: ${props => props.padding || '0px'};
   overflow: hidden;
`;

export default function Skeleton(props: SkeletonType) {
   const { ...restProps } = props;

   return (
      <Layout {...restProps}>
         <Span></Span>
      </Layout>
   );
}
