import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

import { useCreateEventNoobProHackerLine } from '@/application/createEventNoobProHacker';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';

const Layout = styled.div`
   display: flex;
   gap: 30px;
   margin-top: 15px;
`;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

type Props = {
   handleLineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   setLineCountAndArchitectCount: () => void;
   lineCount: number;
   architectCountPerLine: number;
};

export default function SetLineInfo(props: Props) {
   const { lineCount, architectCountPerLine, handleLineChange, setLineCountAndArchitectCount } = props;

   return (
      <Layout>
         <Wrapper>
            <TextBox text="라인 수" />
            <InputBox name="lineCount" type="number" onChange={handleLineChange} value={lineCount} width="43px" />
         </Wrapper>
         <Wrapper>
            <TextBox text="라인별 건축가 수" />
            <InputBox
               name="architectCountPerLine"
               type="number"
               onChange={handleLineChange}
               value={architectCountPerLine}
               width="43px"
            />
         </Wrapper>
         <Button text="확인" padding="5px" onClick={() => setLineCountAndArchitectCount()} />
      </Layout>
   );
}
