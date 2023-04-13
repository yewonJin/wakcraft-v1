import styled from 'styled-components';

import { useCreateNoobProHacker } from '@/application/createNoobProHacker';

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

export function NoobProHackerForm({ children }: { children: React.ReactNode }) {
   const { addNoobProHacker } = useCreateNoobProHacker();

   return (
      <Form>
         {children}
         <button onClick={addNoobProHacker}>add</button>
      </Form>
   );
}
