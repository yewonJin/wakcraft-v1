import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import TopNav from '@/components/TopNav';

export default function App({ Component, pageProps }: AppProps) {
   const [client] = useState(() => new QueryClient());

   return (
      <QueryClientProvider client={client}>
         <Hydrate state={pageProps.dehydratedState}>
            <RecoilRoot>
               <TopNav />
               <Component {...pageProps} />
            </RecoilRoot>
         </Hydrate>
      </QueryClientProvider>
   );
}
