import { NoobProHacker } from '@/Domain/noobProHacker';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const Container = styled.ul`
   display: flex;
   gap: 20px;
`;

const Wrapper = styled.li`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 7px;

   > input {
      padding: 0px 5px;
      font-size: 18px;
      height: 30px;
   }
`;

const InputBox = styled.input<{ width?: string }>`
   width: ${props => props.width || '150px'};
`;

export function AddNoobProHackerInfo({
   value,
   setValue,
}: {
   value: NoobProHacker['contentInfo'];
   setValue: Dispatch<SetStateAction<NoobProHacker['contentInfo']>>;
}) {
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(prev => {
         return {
            ...prev,

            [e.target.name]: e.target.value,
         };
      });
   };

   return (
      <Container>
         <Wrapper>
            <h3>회차</h3>
            <InputBox onChange={handleChange} value={value.episode} name="episode" type="number" width="60px" />
         </Wrapper>
         <Wrapper>
            <h3>주제</h3>
            <InputBox onChange={handleChange} value={value.main_subject} name="main_subject" width="150px" />
         </Wrapper>
         <Wrapper>
            <h3>날짜</h3>
            <InputBox onChange={handleChange} value={value.date} name="date" type="date" />
         </Wrapper>
         <Wrapper>
            <h3>유튜브 링크</h3>
            <InputBox onChange={handleChange} value={value.youtube_url} name="youtube_url" width="300px" />
         </Wrapper>
      </Container>
   );
}
