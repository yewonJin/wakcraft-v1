import styled from 'styled-components';
import TextBox from '../TextBox';

const Layout = styled.span`
   position: absolute;
   bottom: 3px;
   right: 3px;
   z-index: 5;
   display: flex;
   justify-content: center;
   align-items: center;

   > h2 {
      z-index: 3;
      font-size: 1rem;
      color: white;
      border-bottom-right-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0px 12px;
   }
`;

type Props = {
   date: Date;
};

export default function DateBox(props: Props) {
   const { date } = props;

   return (
      <Layout>
         <TextBox text={date.toJSON().split('T')[0]} />
      </Layout>
   );
}
