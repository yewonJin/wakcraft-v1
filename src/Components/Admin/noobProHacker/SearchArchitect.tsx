import { NoobProHacker } from '@/Domain/noobProHacker';
import { useMutationArchitect, useQueryArchitectWithoutPortfolio } from '@/Services/ArchitectAdapters';
import { fuzzySearch } from '@/utils/fuzzySearch';

import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AddArchitect } from './AddArchitect';

const Layout = styled.div`
   display: flex;
   width: 350px;
   flex-direction: column;
   gap: 10px;
   padding: 10px;
   background-color: #cacaca;

   > input {
      height: 40px;
      font-size: 16px;
      border-radius: 15px;
      outline: none;
      border: 0px;
      text-align: center;
   }

   ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      > li {
         list-style: none;
         padding: 0px 20px;
         :hover {
            cursor: pointer;
            background-color: white;
         }
      }
   }
`;

const InputBox = styled.input<{ width?: string }>`
   width: ${props => props.width || '150px'};
`;

type ArchitectInfo = {
   minecraft_id: string;
   wakzoo_id: string;
   tier: string;
};

export function SearchArchitect({
   value,
   setValue,
   isEmpty,
   setEmptyState,
   currentLineIndex
}: {
   value: NoobProHacker['lineInfo'];
   setValue: Dispatch<SetStateAction<NoobProHacker['lineInfo']>>;
   isEmpty: boolean;
   setEmptyState: (boo: boolean) => void;
   currentLineIndex: number;
}) {
   const [input, setInput] = useState('');
   const [architectInfo, setArchitectInfo] = useState<ArchitectInfo>({
      minecraft_id: '',
      wakzoo_id: '',
      tier: '',
   })
   const [lineCount, setLineCount] = useState(0);

   const data = useQueryArchitectWithoutPortfolio();

   const mutation = useMutationArchitect();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   if (!data) return <Layout></Layout>;

   const handleClick = (minecraft_id: string) => {
      if(value[currentLineIndex].line_details.hacker.minecraft_id !== '') return;

      if (lineCount === 0) {
         const newArr = [...value];

         newArr[currentLineIndex].line_details.noob.minecraft_id = minecraft_id;

         setLineCount(1);

         setValue(newArr);
      } else if (lineCount === 1) {
         const newArr = [...value];

         newArr[currentLineIndex].line_details.pro.minecraft_id = minecraft_id;

         setLineCount(2);

         setValue(newArr);
      } else {
         const newArr = [...value];

         newArr[currentLineIndex].line_details.hacker.minecraft_id = minecraft_id;

         setValue(newArr);

         setLineCount(0);
      }
   };

   return (
      <Layout>
         <InputBox value={input} onChange={handleChange} width="100%" placeholder="건축가 검색" />
         <ul>
            {data
               .filter(item => fuzzySearch(item.minecraft_id, input))
               .map(item => {
                  return (
                     <li key={item.minecraft_id} onClick={() => handleClick(item.minecraft_id)}>
                        {item.minecraft_id + ' / ' + item.wakzoo_id + ' / ' + item.tier[item.tier.length - 1]}
                     </li>
                  );
               })}
         </ul>
         <AddArchitect architectInfo={architectInfo} setArchitectInfo={setArchitectInfo} mutation={mutation}/>
      </Layout>
   );
}
