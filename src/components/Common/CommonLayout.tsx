import styled from 'styled-components';

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 130px;
   padding-bottom: 50px;
`;

export function CommonLayout({ children }: { children: React.ReactNode }) {
   return <Container>{children}</Container>;
}
