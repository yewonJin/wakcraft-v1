import { Suspense } from 'react';
import styled from 'styled-components';

import { AddLineDetails } from '@/components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/components/Admin/noobProHacker/NoobProHackerLineInfo';
import { SearchArchitect } from '@/components/Admin/content/SearchArchitect';
import { useCreateContent, useCreateLine, useCreateNoobProHacker } from '@/application/createNoobProHacker';
import TextBox from '@/components/Common/TextBox';
import { CommonLayout } from '@/components/Common/CommonLayout';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';

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
   const { noobProHackerLine, curLineIndex, searchInput, handleSearchInputChange, addArchitectToLine } =
      useCreateLine();
   const { noobProHackerContent, handleChange } = useCreateContent();
   const { addNoobProHacker } = useCreateNoobProHacker();

   return (
      <CommonLayout>
         <Form>
            <Wrapper>
               <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 5px 0px" />
            </Wrapper>
            <AddContentInfo
               contentInfo={noobProHackerContent}
               handleChange={handleChange}
               addContent={addNoobProHacker}
            />
            <NoobProHackerLineInfo />
            <Container>
               <Suspense>
                  <SearchArchitect
                     searchInput={searchInput}
                     handleInputChange={handleSearchInputChange}
                     addToLine={addArchitectToLine}
                  />
               </Suspense>
               {noobProHackerLine[curLineIndex] && <AddLineDetails />}
            </Container>
         </Form>
      </CommonLayout>
   );
}
