import styled from 'styled-components';
import TextBox from '../TextBox';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 2px;
   min-width: 180px;
   padding: 0px 20px;
`;

type Props = {
   topText: string;
   bottomText?: string;
};

export default function InfoBox(props: Props) {
   const { topText, bottomText } = props;

   return (
      <Layout>
         <TextBox text={topText} textAlign="center" fontSize="16px" lineHeight="24px" color="#646464" />
         {bottomText && (
            <TextBox text={bottomText} textAlign="center" fontSize="16px" lineHeight="24px" fontWeight="500" />
         )}
      </Layout>
   );
}
