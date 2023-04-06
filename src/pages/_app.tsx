import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import NavBar from '@/Components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
   const [client] = useState(() => new QueryClient());

   return (
      <QueryClientProvider client={client}>
         <Hydrate state={pageProps.dehydratedState}>
            <NavBar />
            <Component {...pageProps} />
         </Hydrate>
      </QueryClientProvider>
   );
}
