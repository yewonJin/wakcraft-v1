import styled from 'styled-components';

import { SetterOrUpdater } from 'recoil';

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

type Props = {
   lines: any[];
   setCurLineIndex: SetterOrUpdater<number>;
};

export function ContentLineInfo(props: Props) {
   const { lines, setCurLineIndex } = props;

   return (
      <LineList>
         {lines.map((line, index) => {
            return (
               <LineItem onClick={() => setCurLineIndex(index)} key={index}>
                  {index + 1 + '라인 : ' + line.subject}
               </LineItem>
            );
         })}
      </LineList>
   );
}
