import styled from 'styled-components';

import { AddNoobProHackerInfo } from '@/Components/Admin/noobProHacker/AddNoobProHackerInfo';
import { AddLineDetails } from '@/Components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/Components/Admin/noobProHacker/NoobProHackerLineInfo';
import { NoobProHackerForm } from '@/Components/Admin/noobProHacker/NoobProHackerForm';
import { SearchArchitect } from '@/Components/Admin/noobProHacker/SearchArchitect';
import { CommonLayout } from '@/Components/Common/CommonLayout';
import TextBox from '@/Components/Common/TextBox';
import { useCreateLineInfo } from '@/Application/createNoobProHacker';

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

export default function NoobProhacker() {
   const { lineInfo, curLineIndex } = useCreateLineInfo();

   console.log(lineInfo);

   return (
      <CommonLayout>
         <NoobProHackerForm>
            <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 10px 0px" />
            <AddNoobProHackerInfo />
            <NoobProHackerLineInfo />
            <Container>
               <SearchArchitect />
               {lineInfo[curLineIndex] && <AddLineDetails />}
            </Container>
         </NoobProHackerForm>
      </CommonLayout>
   );
}
