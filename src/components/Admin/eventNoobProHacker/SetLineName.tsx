import { useState } from 'react';
import styled from 'styled-components';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';
import { produce } from 'immer';

const Layout = styled.div`
   display: flex;
   gap: 20px;
   align-items: end;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
`;

export default function SetLineName({
   lineCount,
   tierCountPerLine,
   setLineTierName,
   setArchitectCountPerTier,
}: {
   lineCount: number;
   tierCountPerLine: number;
   setLineTierName: (lineName: string[], lineCount: number) => void;
   setArchitectCountPerTier: (arr: number[]) => void;
}) {
   const [lineName, setLineName] = useState(new Array(tierCountPerLine).fill(''));
   const [architectNumber, setArchitectNumber] = useState<number[]>(new Array(tierCountPerLine).fill(1));

   const handleLineNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value;

      const newArr = [...lineName.slice(0, index), newValue, ...lineName.slice(index + 1)];

      setLineName(newArr);
   };

   const handleArchitectCountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setArchitectNumber(prev =>
         produce(prev, draft => {
            draft[index] = parseInt(e.target.value);
         }),
      );
   };

   return (
      <Layout>
         {new Array(tierCountPerLine).fill(0).map((item, index) => (
            <Wrapper key={item + index}>
               <TextBox text={index + 1 + '라인 이름'} />
               <InputBox
                  name={index + 'lineTier'}
                  type="text"
                  width="100px"
                  onChange={e => handleLineNameChange(e, index)}
                  value={lineName[index]}
               />
               <TextBox text="티어당 건축가 수" />
               <InputBox
                  type="number"
                  name={index + 'architectCountPerTier'}
                  onChange={e => handleArchitectCountChange(e, index)}
               />
            </Wrapper>
         ))}
         <Button
            text="확인"
            padding="8px"
            onClick={() => {
               setLineTierName(lineName, lineCount);
               setArchitectCountPerTier(architectNumber);
            }}
         />
      </Layout>
   );
}
