import styled from 'styled-components';

import { useQueryArchitectWithoutPortfolio } from '@/services/architectAdapters';
import { fuzzySearch } from '@/utils/fuzzySearch';
import { AddArchitect } from '../architect/AddArchitect';
import { useCreateLineInfo } from '@/application/createNoobProHacker';
import InputBox from '@/components/Common/InputBox';

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

export function SearchArchitect() {
   const { searchInput, handleSearchInputChange: handleChange, addArchitectToLine } = useCreateLineInfo();

   const ArchitectsInfo = useQueryArchitectWithoutPortfolio();

   if (!ArchitectsInfo) return <Layout>Error</Layout>;

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
                  <ArchitectItem key={item.minecraft_id} onClick={() => addArchitectToLine(item.minecraft_id)}>
                     {item.minecraft_id + ' / ' + item.wakzoo_id + ' / ' + item.tier[item.tier.length - 1]}
                  </ArchitectItem>
               );
            })}
         </ArchitectList>
         <AddArchitect />
      </Layout>
   );
}
