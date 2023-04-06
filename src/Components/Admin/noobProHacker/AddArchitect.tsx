import styled from 'styled-components';
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import { UseMutationResult } from 'react-query';

const Layout = styled.form`
   display: flex;
   gap: 10px;

   > div > input {
      width: 100px;
   }
`;

type ArchitectInfo = {
   minecraft_id: string;
   wakzoo_id: string;
   tier: string;
};

export function AddArchitect({
   architectInfo,
   setArchitectInfo,
   mutation,
}: {
   architectInfo: ArchitectInfo;
   setArchitectInfo: Dispatch<SetStateAction<ArchitectInfo>>;
   mutation: UseMutationResult<any, unknown, any, unknown>;
}) {
   const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setArchitectInfo(prev => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   return (
      <Layout
         onSubmit={e => {
            e.preventDefault();
         }}
      >
         <div>
            <h3>마크 아이디</h3>
            <input name="minecraft_id" value={architectInfo.minecraft_id} onChange={HandleChange} />
         </div>
         <div>
            <h3>왁물원 아이디</h3>
            <input name="wakzoo_id" value={architectInfo.wakzoo_id} onChange={HandleChange} />
         </div>
         <div>
            <h3>티어</h3>
            <input name="tier" value={architectInfo.tier} onChange={HandleChange} />
         </div>
         <button
            onClick={e => {
               e.preventDefault();

               mutation.mutate(architectInfo);
            }}
         ></button>
      </Layout>
   );
}
