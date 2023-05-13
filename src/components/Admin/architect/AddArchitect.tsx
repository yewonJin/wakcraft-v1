import styled from 'styled-components';
import { Fragment } from 'react';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateArchitect } from '@/application/createArchitect';
import { Button } from '@/components/Common/Button';
import SelectTierBox from '@/components/Common/SelectTierBox';

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
      <Fragment>
         <Layout>
            <Wrapper>
               <TextBox text={'마크 아이디'} />
               <InputBox
                  type="text"
                  name="minecraft_id"
                  value={architectInfo.minecraft_id}
                  onChange={handleChange}
                  width="100px"
                  height="25px"
                  border="1px solid #cacaca"
               />
            </Wrapper>
            <Wrapper>
               <TextBox text={'왁물원 아이디'} />
               <InputBox
                  type="text"
                  name="wakzoo_id"
                  value={architectInfo.wakzoo_id}
                  onChange={handleChange}
                  width="100px"
                  height="25px"
                  border="1px solid #cacaca"
               />
            </Wrapper>
            <Wrapper>
               <TextBox text={'티어'} />
               <SelectTierBox name="tier" value={architectInfo.tier} onChange={handleChange} />
            </Wrapper>
            <Button text="추가" onClick={addArchitect} padding="12px 10px" fontSize="14px"></Button>
         </Layout>
      </Fragment>
   );
}
