import styled from 'styled-components';
import { ChangeEvent, Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

type InputStyleType = {
   width?: string;
   height?: string;
   borderRadius?: string;
   border?: string;
   textAlign?: string;
   padding?: string;
   fontSize?: string;
   lineHeight?: string;
};

const Input = styled.input<InputStyleType>`
   width: ${props => props.width || 'auto'};
   height: ${props => props.height || 'auto'};
   border-radius: ${props => props.borderRadius || '0px'};
   border: ${props => props.border || '1px solid #313131'};
   text-align: ${props => props.textAlign || ''};
   font-size: ${props => props.fontSize || '16px'};
   line-height: ${props => props.lineHeight || '24px'};
   padding: ${props => props.padding || '0px 5px'};
   outline: none;
`;

type InputBoxType = {
   placeholder?: string;
   name: string;
   value: string | number;
   type: HTMLInputTypeAttribute;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   [props: string]: any;
};

function InputBox(props: InputBoxType) {
   const { type, placeholder, value, onChange, name, ...restProps } = props;

   return <Input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} {...restProps} />;
}

export default InputBox;
