import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { useMutationLogin } from '@/services/authAdapcter';
import { ChangeEvent, useState } from 'react';

export default function Login() {
   const mutation = useMutationLogin();

   const [input, setInput] = useState({
      username: '',
      password: '',
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   return (
      <CommonLayout>
         <TextBox text={'로그인'} />
         <form
            onSubmit={e => {
               e.preventDefault();

               mutation.mutate(input);
            }}
         >
            <InputBox type="text" name="username" value={input.username} onChange={handleChange} />
            <InputBox type="password" name="password" value={input.password} onChange={handleChange} />
            <button>제출</button>
         </form>
      </CommonLayout>
   );
}
