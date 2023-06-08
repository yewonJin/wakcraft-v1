import styled, { keyframes } from 'styled-components';

type SkeletonType = {
   [props: string]: string | boolean;
};

type SkeletonStyleType = {
   darkMode?: boolean;
   width?: string;
   height?: string;
   aspectRatio?: string;
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

const darkModeLoading = keyframes`
       0% {
         background-color: #333;
    }
    50%,
    100% {
         background-color: #555;
    }
`;

const Layout = styled.div<SkeletonStyleType>`
   position: relative;
   background-color: ${props => (props.darkMode ? '#333' : '#ddd')};
   width: ${props => props.width || 'auto'};
   height: ${props => props.height || 'auto'};
   aspect-ratio: ${props => props.aspectRatio || ''};
   border-radius: ${props => props.borderRadius || '0px'};
   margin: ${props => props.margin || '0px'};
   padding: ${props => props.padding || '0px'};
   overflow: hidden;

   animation: ${props => (props.darkMode ? darkModeLoading : loading)} 1s infinite linear;
`;

export default function Skeleton(props: SkeletonType) {
   const { ...restProps } = props;

   return <Layout {...restProps}></Layout>;
}
