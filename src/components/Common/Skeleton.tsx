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
         background-color: #ddd;
    }
    50%,
    100% {
         background-color: #eee;
    }
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

   animation: ${loading} 1s infinite linear;

`;

export default function Skeleton(props: SkeletonType) {
   const { ...restProps } = props;

   return (
      <Layout {...restProps}>
      </Layout>
   );
}
