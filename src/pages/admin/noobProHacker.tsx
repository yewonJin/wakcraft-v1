import styled from 'styled-components';

import { AddNoobProHackerInfo } from '@/Components/Admin/noobProHacker/AddNoobProHackerInfo';
import { AddLineDetails } from '@/Components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/Components/Admin/noobProHacker/NoobProHackerLineInfo';
import { NoobProHackerForm } from '@/Components/Admin/noobProHacker/NoobProHackerForm';
import { SearchArchitect } from '@/Components/Admin/noobProHacker/SearchArchitect';
import { CommonLayout } from '@/Components/Common/CommonLayout';
import TextBox from '@/Components/Common/TextBox';
import { useState } from 'react';
import { NoobProHacker, createNoobProHacker } from '@/Domain/noobProHacker';

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

export default function NoobProhacker() {
   const [contentInfo, setContentInfo] = useState<NoobProHacker['contentInfo']>(createNoobProHacker().contentInfo);
   const [lineInfo, setLineInfo] = useState<NoobProHacker['lineInfo']>(createNoobProHacker().lineInfo);
   const [curLineIndex, setCurLineIndex] = useState(0);
   const [isEmpty, setIsEmpty] = useState(true);

   const setStateCurLineIndex = (index: number) => setCurLineIndex(index);
   const setEmptyState = (boolean: boolean) => setIsEmpty(boolean);

   return (
      <CommonLayout>
         <NoobProHackerForm>
            <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 10px 0px" />
            <AddNoobProHackerInfo contentInfo={contentInfo} setContentInfo={setContentInfo} />
            <NoobProHackerLineInfo lineInfo={lineInfo} setStateCurLineIndex={setStateCurLineIndex} />
            <Container>
               <SearchArchitect lineInfo={lineInfo} setLineInfo={setLineInfo} curLineIndex={curLineIndex} />
               {lineInfo[curLineIndex] && (
                  <AddLineDetails
                     lineInfo={lineInfo}
                     setLineInfo={setLineInfo}
                     curLineIndex={curLineIndex}
                     setStateCurLineIndex={setStateCurLineIndex}
                     setEmptyState={setEmptyState}
                  />
               )}
            </Container>
         </NoobProHackerForm>
      </CommonLayout>
   );
}
