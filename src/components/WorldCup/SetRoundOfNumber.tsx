import styled from 'styled-components';
import { SetStateAction } from 'react';

import { Button } from '../Common/Button';
import TextBox from '../Common/TextBox';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   width: 1200px;
   margin: 0px auto;
   gap: 10px;
`;

const SelectBox = styled.div`
   display: flex;
   gap: 10px;
   height: 38px;
   padding-top: 3px;
`;

const Select = styled.select`
   width: 100px;
   border-radius: 5px;
   font-size: 18px;
   font-weight: 500;
`;

const TextWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-top: 40px;
`;

type Props = {
   roundOfNumber: number;
   setRoundOfNumber: (value: SetStateAction<number>) => void;
   setPage: (value: SetStateAction<number>) => void;
};

export default function SetRoundOfNumber(props: Props) {
   const { roundOfNumber, setRoundOfNumber, setPage } = props;

   return (
      <Layout>
         <TextBox text={"눕프핵 '해커' 월드컵"} fontSize="32px" lineHeight="48px" color="white" fontWeight="500" />
         <SelectBox>
            <Select value={roundOfNumber} onChange={e => setRoundOfNumber(parseInt(e.target.value))}>
               <option key={128} value={128}>
                  128강
               </option>
               <option key={64} value={64}>
                  64강
               </option>
               <option key={32} value={32}>
                  32강
               </option>
               <option key={16} value={16}>
                  16강
               </option>
            </Select>
            <Button text="시작" padding="6px 14px" margin="0px" onClick={() => setPage(1)} />
         </SelectBox>
         <TextWrapper>
            <TextBox text={'유의사항'} fontSize="24px" lineHeight="32px" color="white" fontWeight="500" />
            <TextBox
               text={'최근 눕프핵 작품이 상대적으로 퀄리티가 높기 때문에 초기 작품이 우선적으로 제외됩니다.'}
               fontSize="18px"
               lineHeight="24px"
               color="#ccc"
               fontWeight="400"
            />
            <TextBox
               text={'페이지를 닫거나 새로고침을 누르면 진행 사항이 초기화 됩니다'}
               fontSize="18px"
               lineHeight="24px"
               color="#ccc"
               fontWeight="400"
            />
         </TextWrapper>
      </Layout>
   );
}
