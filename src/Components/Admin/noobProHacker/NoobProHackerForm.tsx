import styled from 'styled-components';

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

export function NoobProHackerForm({ children }: { children: React.ReactNode }) {
   return <Form>{children}</Form>;
}
