import styled from 'styled-components';

import { ChangeEvent, useState } from 'react';
import { useMutationArchitect } from '@/Services/ArchitectAdapters';
import TextBox from '@/Components/Common/TextBox';
import InputBox from '@/Components/Common/InputBox';
import { checkEmptyInDeepObject } from '@/utils/lib';

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
   const [architectInput, setArchitectInput] = useState({
      minecraft_id: '',
      wakzoo_id: '',
      tier: '',
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArchitectInput(prev => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (checkEmptyInDeepObject(architectInput)) {
         setArchitectInput({
            minecraft_id: '',
            wakzoo_id: '',
            tier: '',
         });
         mutation.mutate(architectInput);
      }
   };
   
   const mutation = useMutationArchitect();

   return (
      <Layout>
         <Wrapper>
            <TextBox text={'마크 id'} />
            <InputBox
               type="text"
               name="minecraft_id"
               value={architectInput.minecraft_id}
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
               value={architectInput.wakzoo_id}
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
               value={architectInput.tier}
               onChange={handleChange}
               width="90px"
               height="25px"
               border="1px solid #313131"
            />
         </Wrapper>
         <button onClick={handleClick}>추가</button>
      </Layout>
   );
}
