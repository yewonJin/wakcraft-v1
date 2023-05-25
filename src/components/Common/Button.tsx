import styled from 'styled-components';

type ButtonStyleType = {
   height?: string;
   border?: string;
   borderRadius?: string;
   backgroundColor?: string;
   color?: string;
   padding?: string;
   margin?: string;
   fontSize?: string;
   hoverBackgroundColor?: string;
   hoverColor?: string;
};

const ButtonBox = styled.button<ButtonStyleType>`
   height: ${props => props.height || 'auto'};
   border: ${props => props.border || 'none'};
   border-radius: ${props => props.borderRadius || '5px'};
   background-color: ${props => props.backgroundColor || '#4caf50'};
   color: ${props => props.color || 'white'};
   padding: ${props => props.padding || '12px 0px'};
   margin: ${props => props.margin || ''};
   font-size: ${props => props.fontSize || '16px'};

   :hover {
      cursor: pointer;
      background-color: ${props => props.hoverBackgroundColor || '#3d9c40'};
      color: ${props => props.hoverColor || ''};
   }
`;

type ButtonType = {
   text: string;
   onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   [props: string]: any;
};

export function Button(props: ButtonType) {
   const { onClick, text, ...restProps } = props;

   return (
      <ButtonBox onClick={onClick} {...restProps}>
         {text}
      </ButtonBox>
   );
}
