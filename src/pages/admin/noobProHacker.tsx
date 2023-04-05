import styled from 'styled-components';

import { AddNoobProHackerInfo } from '@/Components/Admin/noobProHacker/AddNoobProHackerInfo';
import { AddLineDetails } from '@/Components/Admin/noobProHacker/AddLineDetails';
import { NoobProHackerLineInfo } from '@/Components/Admin/noobProHacker/NoobProHackerLineInfo';
import { NoobProHackerForm } from '@/Components/Admin/noobProHacker/NoobProHackerForm';
import { SearchArchitect } from '@/Components/Admin/noobProHacker/SearchArchitect';
import { CommonLayout } from '@/Components/Common/CommonLayout';
import TextBox from '@/Components/Common/TextBox';
import { useState } from 'react';
import { NoobProHacker } from '@/Domain/noobProHacker';

const Container = styled.div`
   display: flex;
   gap: 20px;
   height: 650px;
`;

export default function NoobProhacker() {
   const [contentInfo, setContentInfo] = useState<NoobProHacker['contentInfo']>(initialNoobProHacker.contentInfo);
   const [lineInfo, setLineInfo] = useState<NoobProHacker['lineInfo']>(initialNoobProHacker.lineInfo);
   const [currentLineIndex, setCurrentLineIndex] = useState(0);

   return (
      <CommonLayout>
         <NoobProHackerForm>
            <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 10px 0px" />
            <AddNoobProHackerInfo value={contentInfo} setValue={setContentInfo} />
            <NoobProHackerLineInfo value={lineInfo} />
            <Container>
               <SearchArchitect value={lineInfo} setValue={setLineInfo} />
               {lineInfo[currentLineIndex] && (
                  <AddLineDetails value={lineInfo} setValue={setLineInfo} currentLineIndex={currentLineIndex} />
               )}
            </Container>
         </NoobProHackerForm>
      </CommonLayout>
   );
}

const initialNoobProHacker: NoobProHacker = {
   contentInfo: {
      episode: 0,
      main_subject: '',
      date: '',
      youtube_url: '',
   },
   lineInfo: [],
};
