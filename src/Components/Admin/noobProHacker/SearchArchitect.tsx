import { NoobProHacker } from '@/Domain/noobProHacker';
import { useQueryArchitectWithoutPortfolio } from '@/Services/ArchitectAdapters';
import { fuzzySearch } from '@/utils/fuzzySearch';

import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
   flex: 1;
   display: flex;
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

export function SearchArchitect({
   value,
   setValue,
}: {
   value: NoobProHacker['lineInfo'];
   setValue: Dispatch<SetStateAction<NoobProHacker['lineInfo']>>;
}) {
   const [input, setInput] = useState('');
   const [lineCount, setLineCount] = useState(0);

   const data = useQueryArchitectWithoutPortfolio();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   if (!data) return <Layout></Layout>;

   const handleClick = (minecraft_id: string) => {
      if (lineCount === 0) {
         const newArr = [...value];

         newArr.push({
            subject: '',
            youtube_url: '',
            line_ranking: 0,
            line_details: {
               noob: {
                  minecraft_id: minecraft_id,
                  image_url: '',
                  youtube_url: '',
                  ranking: 0,
               },
               pro: {
                  minecraft_id: '',
                  image_url: '',
                  youtube_url: '',
                  ranking: 0,
               },
               hacker: {
                  minecraft_id: '',
                  image_url: '',
                  youtube_url: '',
                  ranking: 0,
               },
            },
         });

         setLineCount(1);

         setValue(newArr);
      } else if (lineCount === 1) {
         const newArr = [...value];

         newArr[value.length - 1].line_details.pro.minecraft_id = minecraft_id;

         setLineCount(2);

         setValue(newArr);
      } else {
         const newArr = [...value];

         newArr[value.length - 1].line_details.hacker.minecraft_id = minecraft_id;

         setLineCount(0);

         setValue(newArr);
      }

      console.log(value);
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
      </Layout>
   );
}
