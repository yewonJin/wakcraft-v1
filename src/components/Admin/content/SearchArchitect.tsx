import styled from 'styled-components';

import { useQueryArchitectWithoutPortfolio } from '@/services/architectAdapters';
import { fuzzySearch } from '@/utils/fuzzySearch';
import { AddArchitect } from '../architect/AddArchitect';
import InputBox from '@/components/Common/InputBox';
import { ChangeEvent } from 'react';

const Layout = styled.div`
   display: flex;
   width: 450px;
   flex-direction: column;
   gap: 10px;
   padding: 10px;
   background-color: white;
   border: 1px solid #cacaca;
`;

const ArchitectList = styled.ul`
   height: 600px;
   overflow-y: scroll;
   display: flex;
   flex-direction: column;
   gap: 10px;

   ::-webkit-scrollbar {
      width: 12px;
   }

   ::-webkit-scrollbar-thumb {
      height: 30%;
      background: gray;
   }

   ::-webkit-scrollbar-thumb {
      background: #8b8b8b;
      background-clip: padding-box;
      border: 1px solid transparent;
      border-radius: 8px;
   }
`;

const ArchitectItem = styled.li`
   list-style: none;
   margin: 0px 5px;
   padding: 0px 10px;
   padding-bottom: 3px;
   border-bottom: 1px solid #ddd;
   :hover {
      cursor: pointer;
   }
`;

type Props = {
   searchInput: string;
   handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
   addToLine: (minecraft_id: string) => void;
};

export function SearchArchitect(props: Props) {
   const { searchInput, handleInputChange, addToLine } = props;

   const architects = useQueryArchitectWithoutPortfolio();

   if (!architects) return <Layout>Error</Layout>;

   return (
      <Layout>
         <InputBox
            name="search"
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            width="100%"
            height="40px"
            textAlign="center"
            border="1px solid #cacaca"
            placeholder="건축가 검색"
         />
         <ArchitectList>
            {architects
               .filter(architect => fuzzySearch(architect.minecraft_id, searchInput))
               .map(architect => {
                  return (
                     <ArchitectItem key={architect.minecraft_id} onClick={() => addToLine(architect.minecraft_id)}>
                        {architect.minecraft_id +
                           ' / ' +
                           architect.wakzoo_id +
                           ' / ' +
                           architect.tier[architect.tier.length - 1]}
                     </ArchitectItem>
                  );
               })}
         </ArchitectList>
         <AddArchitect />
      </Layout>
   );
}
