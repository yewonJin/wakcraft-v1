import styled from 'styled-components';
import { Fragment, useState, useEffect } from 'react';

import {
   useCreateEventNoobProHacker,
   useCreateEventNoobProHackerContent,
   useCreateEventNoobProHackerLine,
} from '@/application/createEventNoobProHacker';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { AddLineDetails } from '@/components/Admin/eventNoobProHacker/AddLineDetails';
import SetLineInfo from '@/components/Admin/eventNoobProHacker/SetLineInfo';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import { ContentLineInfo } from '@/components/Admin/eventNoobProHacker/ContentLineInfo';
import { useCreateLine } from '@/application/createNoobProHacker';
import { SearchArchitect } from '@/components/Admin/content/SearchArchitect';
import SetLineName from '@/components/Admin/eventNoobProHacker/SetLineName';
import {
   useQueryEventNoobProHackerByEpisode,
   useQueryEventNoobProHackerWithoutLine,
} from '@/services/eventNoobProHackerAdapters';
import { Button } from '@/components/Common/Button';

const Wrapper = styled.div`
   display: flex;
   gap: 20px;
`;

const EditBox = styled.div`
   display: flex;
   gap: 20px;
   margin-bottom: 30px;
`;

export default function EventNoobProHacker() {
   const { eventNoobProHackerContent, handleChange } = useCreateEventNoobProHackerContent();
   const {
      eventNoobProHackerLine,
      tierCountPerLine,
      searchInput,
      handleInputChange,
      lineCount,
      addToLine,
      contentSettingPage,
      setLineCountAndArchitectCount,
      changeLineDetails,
      setArchitectCountPerTier,
      resetLine,
      changeCommonLineInfo,
      setLineTierName,
      setLineImage,
      resetImage,
      handleChange: handleLineChange,
      moveToEditPage,
      increaseArchitectCount,
      decreaseArchitectCount
   } = useCreateEventNoobProHackerLine();
   const { addEventNoobProHacker, putEventNoobProHacker, editEventNoobProHacker } = useCreateEventNoobProHacker();
   const { setCurLineIndex } = useCreateLine();

   const contentInfo = useQueryEventNoobProHackerWithoutLine();
   const [selectInput, setSelectInput] = useState(1);
   const [isEdit, setIsEdit] = useState(false);
   const { data, refetch } = useQueryEventNoobProHackerByEpisode(selectInput);

   useEffect(() => {
      if (!data) return;

      setIsEdit(true);
      moveToEditPage();
      putEventNoobProHacker(data);
   }, [data]);

   return (
      <CommonLayout>
         <TextBox
            text="이벤트 눕프로해커"
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
                        {item.contentInfo.episode + '화 : ' + item.contentInfo.contentName}
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

         {contentSettingPage === 0 ? (
            <SetLineInfo
               tierCountPerLine={tierCountPerLine}
               lineCount={lineCount}
               handleLineChange={handleLineChange}
               setLineCountAndArchitectCount={setLineCountAndArchitectCount}
            />
         ) : contentSettingPage === 1 ? (
            <SetLineName
               lineCount={lineCount}
               tierCountPerLine={tierCountPerLine}
               setLineTierName={setLineTierName}
               setArchitectCountPerTier={setArchitectCountPerTier}
            />
         ) : (
            <Fragment>
               <AddContentInfo
                  isEdit={isEdit}
                  contentInfo={eventNoobProHackerContent}
                  handleChange={handleChange}
                  addContent={addEventNoobProHacker}
                  editContent={editEventNoobProHacker}
               />
               <ContentLineInfo lines={eventNoobProHackerLine} setCurLineIndex={setCurLineIndex} />
               <Wrapper>
                  <SearchArchitect
                     searchInput={searchInput}
                     handleInputChange={handleInputChange}
                     addToLine={addToLine}
                  />
                  <AddLineDetails
                     eventNoobProHackerLine={eventNoobProHackerLine}
                     changeCommonLineInfo={changeCommonLineInfo}
                     resetLine={resetLine}
                     changeLineDetails={changeLineDetails}
                     tierCountPerLine={tierCountPerLine}
                     setLineImage={setLineImage}
                     resetImage={resetImage}
                     increaseArchitectCount={increaseArchitectCount}
                     decreaseArchitectCount={decreaseArchitectCount}
                  />
               </Wrapper>
            </Fragment>
         )}
      </CommonLayout>
   );
}
