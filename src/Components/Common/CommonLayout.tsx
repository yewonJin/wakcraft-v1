import styled from 'styled-components';

const Container = styled.div`
   width: 1080px;
   margin: 0px auto;
   padding-top: 110px;
`;

export function CommonLayout({ children }: { children: React.ReactNode }) {
   return <Container>{children}</Container>;
}
