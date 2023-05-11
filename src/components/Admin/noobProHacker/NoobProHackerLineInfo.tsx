import styled from 'styled-components';

import { useCreateLine } from '@/application/createNoobProHacker';

const LineList = styled.ul`
   height: 80px;
   padding: 5px 5px;
   border: 1px solid #cacaca;
   display: flex;
   gap: 10px;
`;

const LineItem = styled.li`
   width: 20%;
   text-align: center;
   padding: 25px 20px;
   background-color: #cacaca;
   list-style: none;
   :hover {
      cursor: pointer;
   }
`;

export function NoobProHackerLineInfo() {
   const { noobProHackerLine, setCurLineIndex } = useCreateLine();

   return (
      <LineList>
         {noobProHackerLine.map((line, index) => {
            return (
               <LineItem onClick={() => setCurLineIndex(index)} key={line.subject}>
                  {index + 1 + '라인 : ' + line.subject}
               </LineItem>
            );
         })}
      </LineList>
   );
}
