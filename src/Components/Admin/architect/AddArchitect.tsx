import styled from 'styled-components';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateArchitect } from '@/application/createArchitect';

const Layout = styled.div`
   display: flex;
   gap: 10px;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
   height: 60px;
`;

export function AddArchitect() {
   const { architectInfo, handleChange, addArchitect } = useCreateArchitect();

   return (
      <Layout>
         <Wrapper>
            <TextBox text={'마크 id'} />
            <InputBox
               type="text"
               name="minecraft_id"
               value={architectInfo.minecraft_id}
               onChange={handleChange}
               width="90px"
               height="25px"
               border="1px solid #313131"
            />
         </Wrapper>
         <Wrapper>
            <TextBox text={'왁물원 id'} />
            <InputBox
               type="text"
               name="wakzoo_id"
               value={architectInfo.wakzoo_id}
               onChange={handleChange}
               width="90px"
               height="25px"
               border="1px solid #313131"
            />
         </Wrapper>
         <Wrapper>
            <TextBox text={'티어'} />
            <InputBox
               type="text"
               name="tier"
               value={architectInfo.tier}
               onChange={handleChange}
               width="90px"
               height="25px"
               border="1px solid #313131"
            />
         </Wrapper>
         <button onClick={addArchitect}>추가</button>
      </Layout>
   );
}
