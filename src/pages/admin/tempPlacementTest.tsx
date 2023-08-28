import styled from 'styled-components';

import TextBox from '@/components/Common/TextBox';

import { AddContentInfo } from '@/components/Admin/content/AddContentInfo';
import { useCreateTempPlacementTest } from '@/application/createTempPlacementTest';
import { SearchArchitect } from '@/components/Architect/SearchArchitect';
import { AddArchitect } from '@/components/Admin/architect/AddArchitect';
import InputBox from '@/components/Common/InputBox';

const Layout = styled.div`
   width: 1200px;
   margin: 0px auto;
   height: 1200px;
   padding-top: 130px;
   padding-bottom: 50px;
`;

const Wrapper = styled.div<{ direction?: string; alignItems?: string; gap?: string }>`
   display: flex;
   flex-direction: ${props => (props.direction === 'column' ? 'column' : '')};
   align-items: ${props => props.alignItems};
   gap: ${props => props.gap ?? '100px'};
   margin-top: 15px;
`;

const List = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 15px;
   margin-top: 15px;
`;

const Item = styled.li`
   display: flex;
   flex-direction: column;
   list-style: none;
   position: relative;
`;

export default function TempPlacementTest() {
   const {
      placementTestInfo,
      participantsInfo,
      addToDB,
      changePlacementTestInfo,
      changePlacementTestCafeURL,
      addArchitect,
   } = useCreateTempPlacementTest();

   return (
      <Layout>
         <TextBox text="배치고사 전" fontSize="24px" lineHeight="36px" fontWeight="500" />
         <AddContentInfo
            contentInfo={placementTestInfo}
            handleChange={changePlacementTestInfo}
            addContent={() => addToDB()}
         />
         <Wrapper>
            <Wrapper direction="column" gap="30px">
               <AddArchitect />
               <SearchArchitect handleClick={addArchitect} />
            </Wrapper>
            <List>
               {participantsInfo?.map((item, index) => (
                  <Item key={item.minecraft_id + index}>
                     <Wrapper gap="20px">
                        <TextBox width="250px" text={index + 1 + '번 : ' + item.minecraft_id} />
                        <TextBox text="카페 신청글 주소" />
                        <InputBox
                           type="text"
                           name="cafeUrl"
                           onChange={e => changePlacementTestCafeURL(index, e.target.value)}
                        />
                     </Wrapper>
                  </Item>
               ))}
            </List>
         </Wrapper>
      </Layout>
   );
}
