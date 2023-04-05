import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import { memo } from 'react';

const Input = styled.input``;

type InputBoxType = {
   placeholder: string;
   value?: string;
   handleChange?: SetterOrUpdater<string>;
   [props: string]: any;
};

type InputType = {
   width?: string;
   height?: string;
   padding?: string;
};

function InputBox(props: InputBoxType) {
   const { placeholder, value, handleChange, ...restProps } = props;

   return <Input placeholder={placeholder} value={value}></Input>;
}

export default memo(InputBox);
