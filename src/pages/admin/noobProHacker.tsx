import styled from 'styled-components';

import { AddLineDetails } from '@/components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/components/Admin/noobProHacker/NoobProHackerLineInfo';
import { NoobProHackerForm } from '@/components/Admin/noobProHacker/NoobProHackerForm';
import { SearchArchitect } from '@/components/Admin/noobProHacker/SearchArchitect';
import { CommonLayout } from '@/components/Common/CommonLayout';
import { useCreateLineInfo } from '@/application/createNoobProHacker';
import TextBox from '@/components/Common/TextBox';
import { AddNoobProHackerInfo } from '@/components/Admin/noobProHacker/AddNoobProHackerInfo';
import { Suspense } from 'react';

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

export default function NoobProhacker() {
   const { lineInfo, curLineIndex } = useCreateLineInfo();

   return (
      <CommonLayout>
         <NoobProHackerForm>
            <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 10px 0px" />
            <AddNoobProHackerInfo />
            <NoobProHackerLineInfo />
            <Container>
               <Suspense>
                  <SearchArchitect />
               </Suspense>
               {lineInfo[curLineIndex] && <AddLineDetails />}
            </Container>
         </NoobProHackerForm>
      </CommonLayout>
   );
}
