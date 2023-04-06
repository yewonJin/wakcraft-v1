import styled from 'styled-components';

import { NoobProHacker } from '@/Domain/noobProHacker';
import { useQueryArchitectWithoutPortfolio } from '@/Services/ArchitectAdapters';
import { fuzzySearch } from '@/utils/fuzzySearch';
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import { AddArchitect } from './AddArchitect';
import InputBox from '@/Components/Common/InputBox';

const Layout = styled.div`
   display: flex;
   width: 350px;
   flex-direction: column;
   gap: 10px;
   padding: 10px;
   background-color: #cacaca;
`;

const ArchitectList = styled.ul`
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 5px;
`;

const ArchitectItem = styled.li`
   list-style: none;
   padding: 0px 20px;
   :hover {
      cursor: pointer;
      background-color: white;
   }
`;

export function SearchArchitect({
   lineInfo,
   setLineInfo,
   curLineIndex,
}: {
   lineInfo: NoobProHacker['lineInfo'];
   setLineInfo: Dispatch<SetStateAction<NoobProHacker['lineInfo']>>;
   curLineIndex: number;
}) {
   const [searchInput, setSearchInput] = useState('');
   const [lineCount, setLineCount] = useState(0);

   const ArchitectsInfo = useQueryArchitectWithoutPortfolio();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   if (!ArchitectsInfo) return <Layout>Error</Layout>;

   const handleClick = (minecraft_id: string) => {
      if (lineInfo[curLineIndex].line_details.hacker.minecraft_id !== '') return;

      const line = ['noob', 'pro', 'hacker'][lineCount] as 'noob' | 'pro' | 'hacker';

      const newArr = [...lineInfo];

      newArr[curLineIndex].line_details[line].minecraft_id = minecraft_id;

      setLineCount(lineCount == 2 ? 0 : lineCount + 1);
      setLineInfo(newArr);
   };

   return (
      <Layout>
         <InputBox
            name="search"
            type="text"
            value={searchInput}
            onChange={handleChange}
            width="100%"
            height="40px"
            borderRadius="15px"
            textAlign="center"
            border="0px"
            placeholder="건축가 검색"
         />
         <ArchitectList>
            {ArchitectsInfo.filter(item => fuzzySearch(item.minecraft_id, searchInput)).map(item => {
               return (
                  <ArchitectItem key={item.minecraft_id} onClick={() => handleClick(item.minecraft_id)}>
                     {item.minecraft_id + ' / ' + item.wakzoo_id + ' / ' + item.tier[item.tier.length - 1]}
                  </ArchitectItem>
               );
            })}
         </ArchitectList>
         <AddArchitect />
      </Layout>
   );
}
