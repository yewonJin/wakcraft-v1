import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

type InputStyleType = {
   width?: string;
   height?: string;
   borderRadius?: string;
   border?: string;
   borderBottom?: string;
   textAlign?: string;
   padding?: string;
   fontSize?: string;
   lineHeight?: string;
   backgroundColor?: string;
};

const Input = styled.input<InputStyleType>`
   width: ${props => props.width || 'auto'};
   height: ${props => props.height || 'auto'};
   border-radius: ${props => props.borderRadius || '0px'};
   border: ${props => props.border || '1px solid #313131'};
   border-bottom: ${props => props.borderBottom || ''};
   text-align: ${props => props.textAlign || ''};
   font-size: ${props => props.fontSize || '16px'};
   line-height: ${props => props.lineHeight || '24px'};
   padding: ${props => props.padding || '0px 5px'};
   color: ${props => props.color || '#999'};
   background-color: ${props => props.backgroundColor || ''};
   outline: none;
`;

const FileBox = styled.div`
   display: flex;

   > input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
   }
`;

const Label = styled.label`
   display: inline-block;
   padding: 5px 15px;
   color: #fff;
   vertical-align: middle;
   background-color: #777;
   cursor: pointer;
   height: 35px;
`;

type InputBoxType = {
   placeholder?: string;
   name: string;
   value?: string | number;
   type: HTMLInputTypeAttribute;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   [props: string]: any;
};

function InputBox(props: InputBoxType) {
   const { type, placeholder, value, onChange, name, ...restProps } = props;

   if (type === 'file')
      return (
         <FileBox>
            <Label htmlFor="file">파일 업로드</Label>
            <Input id="file" type={type} onChange={onChange} {...restProps}></Input>
         </FileBox>
      );

   return <Input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} {...restProps} />;
}

export default InputBox;
