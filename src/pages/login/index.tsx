import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import { useMutationLogin } from '@/services/authAdapcter';
import LoadingBox from '@/components/Common/LoadingBox';

export default function Login() {
   const router = useRouter();

   if (getCookie('access_token')) {
      router.push(`/admin`);
   }

   const mutation = useMutationLogin();

   const [input, setInput] = useState({
      username: '',
      password: '',
   });
   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   return (
      <CommonLayout>
         {isLoading && <LoadingBox text="로그인 중" />}
         <form
            onSubmit={e => {
               e.preventDefault();
               setIsLoading(true);

               mutation.mutate(input);
               setIsLoading(false);
            }}
         >
            <InputBox type="text" name="username" value={input.username} onChange={handleChange} />
            <InputBox type="password" name="password" value={input.password} onChange={handleChange} />
            <button>제출</button>
         </form>
      </CommonLayout>
   );
}
