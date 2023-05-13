import styled from 'styled-components';
import TextBox from '../TextBox';

const Layout = styled.div`
   display: flex;
   width: 90px;
   gap: 2px;
   flex-direction: column;
   justify-content: center;
`;

type Props = {
   ranking: number;
};

export default function RankingBox(props: Props) {
   const { ranking } = props;

   return (
      <Layout>
         <TextBox text="순위" textAlign="center" fontSize="16px" lineHeight="24px" color="#646464" />
         <TextBox text={ranking + '위'} textAlign="center" fontSize="18px" fontWeight="500" lineHeight="24px" />
      </Layout>
   );
}
