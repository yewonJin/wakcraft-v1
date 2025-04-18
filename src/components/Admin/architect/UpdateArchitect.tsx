import styled from 'styled-components';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { SearchArchitect } from '@/components/Architect/SearchArchitect';
import { useUpdateArchitect } from '@/application/updateArchitect';
import SelectTierBox from '@/components/Common/SelectTierBox';
import { Button } from '@/components/Common/Button';

const Layout = styled.div`
   display: flex;
   gap: 10px;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   margin-bottom: 10px;
`;

export default function UpdateArchitect() {
   const { originalId, input, handleClick, handleChange, handleSubmit } = useUpdateArchitect();

   return (
      <Layout>
         <Wrapper>
            <SearchArchitect handleClick={handleClick} />
         </Wrapper>
         <form onSubmit={handleSubmit}>
            <Wrapper>
               <TextBox text="마인크래프트 id" />
               <InputBox type="text" name="minecraft_id" value={input.minecraft_id} onChange={handleChange} />
               <TextBox text={'원본 id : ' + originalId} />
            </Wrapper>
            <Wrapper>
               <TextBox text="왁물원 id" />
               <InputBox type="text" name="wakzoo_id" value={input.wakzoo_id} onChange={handleChange} />
            </Wrapper>
            <Wrapper>
               <TextBox text="티어" />
               <SelectTierBox name="tier" value={input.tier} onChange={handleChange} />
            </Wrapper>
            <Button text="제출" padding="5px 10px" />
         </form>
      </Layout>
   );
}
