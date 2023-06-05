import styled from 'styled-components';
import TextBox from '../TextBox';
import Link from 'next/link';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 2px;
   min-width: 180px;
   padding: 0px 20px;
`;

type Props = {
   isArchitect?: boolean;
   topText: string;
   bottomText?: string;
};

export default function InfoBox(props: Props) {
   const { isArchitect, topText, bottomText } = props;

   return (
      <Layout>
         <TextBox text={topText} textAlign="center" fontSize="16px" lineHeight="24px" color="#646464" />
         {renderBottomText(bottomText, isArchitect)}
      </Layout>
   );
}

const renderBottomText = (bottomText: string | undefined, isArchitect: boolean | undefined) => {
   if (!bottomText) return;

   if (isArchitect) {
      return (
         <Link href={`/architect/${bottomText}`}>
            <TextBox text={bottomText} textAlign="center" fontSize="16px" lineHeight="24px" fontWeight="500" />
         </Link>
      );
   } else {
      return <TextBox text={bottomText} textAlign="center" fontSize="16px" lineHeight="24px" fontWeight="500" />;
   }
};
