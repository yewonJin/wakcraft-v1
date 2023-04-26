import styled from 'styled-components';
import TextBox from '../Common/TextBox';

const TopContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 1200px;
   padding-bottom: 0px;
   color: white;
`;

const Divider = styled.div`
   width: 1px;
   height: 100%;
   background-color: #cacaca;
`;

const Category = styled.ul`
   display: flex;
   gap: 35px;
   margin: 0px;
   margin-top: 40px;
   margin-bottom: 60px;
   font-weight: 500;

   > li {
      text-align: center;
      list-style: none;
      font-size: 18px;
      color: #ddd;
      padding-bottom: 3px;
   }
`;

export default function ContentsNav() {
   return (
      <TopContainer>
         <TextBox
            text="제 4회"
            fontSize="28px"
            fontWeight="500"
            lineHeight="36px"
            margin="0px 0px 10px 0px"
            color="#868686"
         />
         <TextBox text="눕프로해커 : 나루토 편" fontSize="36px" fontWeight="500" lineHeight="48px" />
         <Category>
            <Divider />
            <li>가아라</li>
            <Divider />
            <li>오로치마루</li>
            <Divider />
            <li>카카시</li>
            <Divider />
            <li>사스케</li>
            <Divider />
            <li>나루토</li>
            <Divider />
         </Category>
      </TopContainer>
   );
}
