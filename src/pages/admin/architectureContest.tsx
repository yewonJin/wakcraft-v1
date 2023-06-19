import styled from 'styled-components';
import { Fragment, useState } from 'react';

import { Button } from '@/components/Common/Button';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import {
   useQueryArchitectureContestByEpisode,
   useQueryArchitectureContestWithoutLine,
} from '@/services/architectureContestAdapters';
import {
   useCreateArchitectureContestContent,
   useCreateArchitectureContestLine,
   useCreateArchitectureContest,
} from '@/application/createArchitectureContest';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { ContentLineInfo } from '@/components/Admin/content/ContentLineInfo';
import { useCreateLine } from '@/application/createNoobProHacker';
import { SearchArchitect } from '@/components/Admin/content/SearchArchitect';
import { AddLineDetails } from '@/components/Admin/architectureContest/AddLineDetails';

const Wrapper = styled.div`
   display: flex;
   gap: 20px;
`;

const EditBox = styled.div`
   display: flex;
   gap: 20px;
   margin-bottom: 30px;
`;

export default function ArchitectureContest() {
   const contentInfo = useQueryArchitectureContestWithoutLine();
   const [selectInput, setSelectInput] = useState(1);
   const [isEdit, setIsEdit] = useState(false);
   const { data, refetch } = useQueryArchitectureContestByEpisode(selectInput);

   const {
      setLineImage,
      searchInput,
      handleInputChange,
      architectureContestLine,
      addToLine,
      resetImage,
      changeCommonLineInfo,
      changeLineDetails,
      resetLine,
   } = useCreateArchitectureContestLine();
   const { architectureContestContent, handleChange } = useCreateArchitectureContestContent();
   const { addArchitectureContest, putArchitectureContest, editArchitectureContest } = useCreateArchitectureContest();
   const { setCurLineIndex } = useCreateLine();

   return (
      <CommonLayout>
         <TextBox
            text="치즐 건콘"
            fontSize="24px"
            lineHeight="36px"
            fontWeight="500"
            margin="0px 0px 15px 0px"
         />
         <EditBox>
            {contentInfo && (
               <select onChange={e => setSelectInput(parseInt(e.target.value))}>
                  {contentInfo.map(item => (
                     <option key={item.contentInfo.episode} value={item.contentInfo.episode}>
                        {item.contentInfo.episode + '화 : ' + item.contentInfo.subject}
                     </option>
                  ))}
               </select>
            )}
            <Button
               text="불러오기"
               padding="5px 10px"
               onClick={async () => {
                  await refetch();
               }}
            />
         </EditBox>
         <Fragment>
            <AddContentInfo
               contentInfo={architectureContestContent}
               handleChange={handleChange}
               addContent={addArchitectureContest}
               editContent={editArchitectureContest}
            />
            <ContentLineInfo lines={architectureContestLine} setCurLineIndex={setCurLineIndex} />
            <Wrapper>
               <SearchArchitect searchInput={searchInput} handleInputChange={handleInputChange} addToLine={addToLine} />
               <AddLineDetails
                  architectureContestLine={architectureContestLine}
                  changeCommonLineInfo={changeCommonLineInfo}
                  resetLine={resetLine}
                  changeLineDetails={changeLineDetails}
                  tierCountPerLine={7}
                  setLineImage={setLineImage}
                  resetImage={resetImage}
               />
            </Wrapper>
         </Fragment>
      </CommonLayout>
   );
}
