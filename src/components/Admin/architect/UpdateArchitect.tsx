import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { SearchArchitect } from '@/components/Search/SearchArchitect';
import { createTierArray } from '@/domain/architect';
import { useMutationUpdateArchitect } from '@/services/architectAdapters';
import { useUpdateArchitect } from '@/application/updateArchitect';

const Layout = styled.div`
   display: flex;
   gap: 10px;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
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
               <select name="tier" value={input.tier} onChange={handleChange}>
                  {createTierArray().map(tier => {
                     return (
                        <option key={tier} value={tier}>
                           {tier}
                        </option>
                     );
                  })}
               </select>
            </Wrapper>
            <button>제출</button>
         </form>
      </Layout>
   );
}
