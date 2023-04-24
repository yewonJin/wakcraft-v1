import styled from 'styled-components';

import { useCreateLineInfo } from '@/application/createNoobProHacker';

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
   const { lineInfo, setStateCurLineIndex } = useCreateLineInfo();

   return (
      <LineList>
         {lineInfo.map((item, index) => {
            return (
               <LineItem onClick={() => setStateCurLineIndex(index)} key={item.subject}>
                  {index + 1 + '라인 : ' + item.subject}
               </LineItem>
            );
         })}
      </LineList>
   );
}
