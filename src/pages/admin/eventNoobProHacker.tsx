import styled from 'styled-components';
import { Fragment } from 'react';

import {
   useCreateEventNoobProHackerContent,
   useCreateEventNoobProHackerLine,
} from '@/application/createEventNoobProHacker';
import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { AddLineDetails } from '@/components/Admin/eventNoobProHacker/AddLineDetails';
import SetLineInfo from '@/components/Admin/eventNoobProHacker/SetLineInfo';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import { ContentLineInfo } from '@/components/Admin/content/ContentLineInfo';
import { useCreateLine } from '@/application/createNoobProHacker';
import { SearchArchitect } from '@/components/Admin/content/SearchArchitect';
import SetLineName from '@/components/Admin/eventNoobProHacker/SetLineName';

const Wrapper = styled.div`
   display: flex;
   gap: 20px;
`;

export default function EventNoobProHacker() {
   const { eventNoobProHackerContent, handleChange } = useCreateEventNoobProHackerContent();
   const {
      eventNoobProHackerLine,
      architectCountPerLine,
      searchInput,
      handleInputChange,
      lineCount,
      addToLine,
      contentSettingPage,
      setLineCountAndArchitectCount,
      changeLineDetails,
      resetLine,
      changeLine,
      setLineTierName,
      setLineImage,
      handleChange: handleLineChange,
   } = useCreateEventNoobProHackerLine();
   const { setCurLineIndex } = useCreateLine();

   console.log(eventNoobProHackerLine);

   return (
      <CommonLayout>
         <TextBox
            text="이벤트 눕프로해커"
            fontSize="24px"
            lineHeight="36px"
            fontWeight="500"
            margin="0px 0px 25px 0px"
         />
         <AddContentInfo
            contentInfo={eventNoobProHackerContent}
            handleChange={handleChange}
            addContent={() => console.log('구현 해야함')}
         />
         {contentSettingPage === 0 ? (
            <SetLineInfo
               architectCountPerLine={architectCountPerLine}
               lineCount={lineCount}
               handleLineChange={handleLineChange}
               setLineCountAndArchitectCount={setLineCountAndArchitectCount}
            />
         ) : contentSettingPage === 1 ? (
            <SetLineName
               lineCount={lineCount}
               architectCountPerLine={architectCountPerLine}
               setLineTierName={setLineTierName}
            />
         ) : (
            <Fragment>
               <ContentLineInfo lines={eventNoobProHackerLine} setCurLineIndex={setCurLineIndex} />
               <Wrapper>
                  <SearchArchitect
                     searchInput={searchInput}
                     handleInputChange={handleInputChange}
                     addToLine={addToLine}
                  />
                  <AddLineDetails
                     eventNoobProHackerLine={eventNoobProHackerLine}
                     changeLine={changeLine}
                     resetLine={resetLine}
                     changeLineDetails={changeLineDetails}
                     architectCountPerLine={architectCountPerLine}
                     setLineImage={setLineImage}
                  />
               </Wrapper>
            </Fragment>
         )}
      </CommonLayout>
   );
}
