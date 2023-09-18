import styled from 'styled-components';
import TextBox from '../TextBox';

const Layout = styled.div<{ tier: string }>`
   display: flex;
   width: ${props => (props.tier === '' ? '60px' : '90px')};
   gap: 2px;
   flex-direction: column;
   justify-content: center;
`;

type Props = {
   tier: string;
   ranking: number;
};

export default function RankingBox(props: Props) {
   const { tier, ranking } = props;

   return (
      <Layout tier={tier}>
         <TextBox text="순위" textAlign="center" fontSize="16px" lineHeight="24px" color="#646464" />
         <TextBox text={ranking + '위'} textAlign="center" fontSize="16px" fontWeight="500" lineHeight="24px" />
      </Layout>
   );
}
