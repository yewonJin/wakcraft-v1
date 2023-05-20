import { useState } from 'react';
import styled from 'styled-components';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';

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
   architectCountPerLine,
   setLineTierName,
}: {
   lineCount: number;
   architectCountPerLine: number;
   setLineTierName: (lineName: string[], lineCount: number) => void;
}) {
   const [lineName, setLineName] = useState(new Array(architectCountPerLine).fill(''));

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value;

      const newArr = [...lineName.slice(0, index), newValue, ...lineName.slice(index + 1)];

      setLineName(newArr);
   };

   return (
      <Layout>
         {new Array(architectCountPerLine).fill(0).map((item, index) => (
            <Wrapper key={item + index}>
               <TextBox text={index + 1 + '라인 이름'} />
               <InputBox
                  name={index + 'lineTier'}
                  type="text"
                  width="100px"
                  onChange={e => handleChange(e, index)}
                  value={lineName[index]}
               />
            </Wrapper>
         ))}
         <Button text="확인" padding="8px" onClick={() => setLineTierName(lineName, lineCount)} />
      </Layout>
   );
}
