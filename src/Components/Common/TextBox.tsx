import styled from 'styled-components';

type TextBoxType = {
   text: string;
   [props: string]: string | boolean;
};

type TextType = {
   ellipsis?: boolean;
   fontSize?: string;
   lineHeight?: string;
   fontWeight?: string;
   color?: string;
   margin?: string;
   textAlign?: string;
   width?: string;
};

const Text = styled.h2<TextType>`
   display: ${props => props.ellipsis && '-webkit-box'};
   overflow: ${props => props.ellipsis && 'hidden'};
   white-space: ${props => props.ellipsis && 'normal'};
   text-overflow: ${props => props.ellipsis && 'ellipsis'};
   -webkit-line-clamp: ${props => props.ellipsis && 2};
   -webkit-box-orient: ${props => props.ellipsis && 'vertical'};
   word-break: ${props => props.ellipsis && 'keep-all'};

   width: ${props => props.width || 'auto'};
   font-size: ${props => props.fontSize || '16px'};
   line-height: ${props => props.lineHeight || '24px'};
   font-weight: ${props => props.fontWeight || '400'};
   margin: ${props => props.margin || '0px'};
   text-align: ${props => props.textAlign || 'left'};
   color: ${props => props.color || ''};
`;

function TextBox(props: TextBoxType) {
   const { text, ...restProps } = props;

   return <Text {...restProps}>{text}</Text>;
}

export default TextBox;
