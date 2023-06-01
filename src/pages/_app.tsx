import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import TopNav from '@/components/TopNav';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
   const [client] = useState(() => new QueryClient());

   return (
      <QueryClientProvider client={client}>
         <Hydrate state={pageProps.dehydratedState}>
            <RecoilRoot>
               <Head>
                  <title>Wakcraft</title>
                  <meta name="description" content="유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="icon" href="/favicon.ico" />
               </Head>
               <TopNav />
               <Component {...pageProps} />
            </RecoilRoot>
         </Hydrate>
      </QueryClientProvider>
   );
}
