import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import { useLogin } from '@/application/auth';
import TextBox from '@/components/Common/TextBox';

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 25px;
   width: 400px;
   margin: 0px auto;
   margin-top: 50px;
`;

const Button = styled.button`
   border: none;
   border-radius: 5px;
   background-color: #4caf50;
   color: white;
   padding: 12px 0px;
   font-size: 16px;
`;

export default function Login() {
   const router = useRouter();

   if (getCookie('access_token')) router.push(`/admin`);

   const { input, handleChange, handleClick } = useLogin();

   return (
      <CommonLayout>
         <Form onSubmit={handleClick}>
            <TextBox text="어드민 페이지" fontSize="24px" fontWeight="500" lineHeight="36px" />
            <InputBox
               type="text"
               name="username"
               value={input.username}
               onChange={handleChange}
               border="none"
               borderBottom="1px solid #cacaca"
               placeholder="아이디"
               padding="0px 0px 8px 5px"
            />
            <InputBox
               type="password"
               name="password"
               value={input.password}
               onChange={handleChange}
               border="none"
               borderBottom="1px solid #cacaca"
               placeholder="비밀번호"
               padding="0px 0px 8px 5px"
            />
            <Button>로그인</Button>
         </Form>
      </CommonLayout>
   );
}
