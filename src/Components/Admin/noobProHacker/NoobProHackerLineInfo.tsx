import { NoobProHacker } from '@/Domain/noobProHacker';
import styled from 'styled-components';

const LineList = styled.ul`
   height: 80px;
   padding: 5px 5px;
   background-color: #cacaca;
   display: flex;
   gap: 10px;
`;

const LineItem = styled.li`
   width: 20%;
   text-align: center;
   padding: 25px 20px;
   background-color: white;
   list-style: none;
   :hover {
      cursor: pointer;
   }
`;

export function NoobProHackerLineInfo({
   lineInfo,
   setStateCurLineIndex,
}: {
   lineInfo: NoobProHacker['lineInfo'];
   setStateCurLineIndex: (index: number) => void;
}) {
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
