import { Suspense } from 'react';
import styled from 'styled-components';

import { AddLineDetails } from '@/components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/components/Admin/noobProHacker/NoobProHackerLineInfo';
import { SearchArchitect } from '@/components/Admin/noobProHacker/SearchArchitect';
import { useCreateLineInfo } from '@/application/createNoobProHacker';
import TextBox from '@/components/Common/TextBox';
import { AddNoobProHackerInfo } from '@/components/Admin/noobProHacker/AddNoobProHackerInfo';
import { CommonLayout } from '@/components/Common/CommonLayout';
import AwsStorage from '@/components/Admin/noobProHacker/AwsStorage';

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
`;

export default function NoobProhacker() {
   const { lineInfo, curLineIndex } = useCreateLineInfo();

   return (
      <CommonLayout>
         <Form>
            <Wrapper>
               <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 5px 0px" />
            </Wrapper>
            <AddNoobProHackerInfo />
            <NoobProHackerLineInfo />
            <Container>
               <AwsStorage />
               <Suspense>
                  <SearchArchitect />
               </Suspense>
               {lineInfo[curLineIndex] && <AddLineDetails />}
            </Container>
         </Form>
      </CommonLayout>
   );
}
