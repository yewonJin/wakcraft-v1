import styled from 'styled-components';

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
   tierCountPerLine: number;
};

export default function SetLineInfo(props: Props) {
   const { lineCount, tierCountPerLine, handleLineChange, setLineCountAndArchitectCount } = props;

   return (
      <Layout>
         <Wrapper>
            <TextBox text="라인 수" />
            <InputBox name="lineCount" type="number" onChange={handleLineChange} value={lineCount} width="43px" />
         </Wrapper>
         <Wrapper>
            <TextBox text="라인별 등급 개수 ex) 눕, 프로, 해커 -> 3" />
            <InputBox
               name="tierCountPerLine"
               type="number"
               onChange={handleLineChange}
               value={tierCountPerLine}
               width="43px"
            />
         </Wrapper>
         <Button text="확인" padding="5px" onClick={() => setLineCountAndArchitectCount()} />
      </Layout>
   );
}
