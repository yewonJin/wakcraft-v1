import { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';

import { AddLineDetails } from '@/components/Admin/noobProHacker/AddLineDetails';
import { SearchArchitect } from '@/components/Admin/content/SearchArchitect';
import { useCreateContent, useCreateLine, useCreateNoobProHacker } from '@/application/createNoobProHacker';
import TextBox from '@/components/Common/TextBox';
import { CommonLayout } from '@/components/Common/CommonLayout';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { ContentLineInfo } from '@/components/Admin/content/ContentLineInfo';
import { useQueryNoobProHackerById, useQueryNoobProHackerWithoutLine } from '@/services/noobProHackerAdapters';
import { Button } from '@/components/Common/Button';

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

const EditBox = styled.div`
   display: flex;
   gap: 20px;
   margin-bottom: 30px;
`;

export default function NoobProhacker() {
   const {
      noobProHackerLine,
      curLineIndex,
      setCurLineIndex,
      searchInput,
      handleSearchInputChange,
      addArchitectToLine,
   } = useCreateLine();
   const { noobProHackerContent, handleChange } = useCreateContent();
   const { addNoobProHacker, putNoobProHacker, editNoobProHacker } = useCreateNoobProHacker();

   const noobProHackers = useQueryNoobProHackerWithoutLine();

   const [selectInput, setSelectInput] = useState(1);
   const [isEdit, setIsEdit] = useState(false);

   const { data, refetch } = useQueryNoobProHackerById(selectInput.toString());

   useEffect(() => {
      if (!data) return;

      putNoobProHacker(data);
   }, [data]);

   console.log(data);

   return (
      <CommonLayout>
         <TextBox text="눕프로해커" fontSize="28px" lineHeight="42px" fontWeight="500" margin="0px 0px 5px 0px" />
         <EditBox>
            {noobProHackers && (
               <select onChange={e => setSelectInput(parseInt(e.target.value))}>
                  {noobProHackers.map(item => (
                     <option key={item.contentInfo.episode} value={item.contentInfo.episode}>
                        {item.contentInfo.episode + '화 : ' + item.contentInfo.main_subject}
                     </option>
                  ))}
               </select>
            )}
            <Button
               text="불러오기"
               padding="5px 10px"
               onClick={async () => {
                  setIsEdit(true);
                  await refetch();
               }}
            />
         </EditBox>
         <AddContentInfo
            isEdit={isEdit}
            contentInfo={noobProHackerContent}
            handleChange={handleChange}
            addContent={addNoobProHacker}
            editContent={editNoobProHacker}
         />
         <ContentLineInfo lines={noobProHackerLine} setCurLineIndex={setCurLineIndex} />
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
      </CommonLayout>
   );
}
