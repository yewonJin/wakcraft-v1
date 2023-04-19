import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { CommonLayout } from '@/components/Common/CommonLayout';
import InputBox from '@/components/Common/InputBox';
import LoadingBox from '@/components/Common/LoadingBox';
import { useLogin } from '@/application/auth';

export default function Login() {
   const router = useRouter();

   if (getCookie('access_token')) router.push(`/admin`);

   const { input, isLoading, handleChange, handleClick } = useLogin();

   return (
      <CommonLayout>
         {isLoading && <LoadingBox text="로그인 중" />}
         <form onSubmit={handleClick}>
            <InputBox type="text" name="username" value={input.username} onChange={handleChange} />
            <InputBox type="password" name="password" value={input.password} onChange={handleChange} />
            <button>제출</button>
         </form>
      </CommonLayout>
   );
}
