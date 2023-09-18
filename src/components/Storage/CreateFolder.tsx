import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

import { useMutationNewFolder } from '@/services/awsAdapters';
import { Content } from '@/domain/aws';

const Layout = styled.li`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 200px;
   box-sizing: border-box;

   > svg {
      font-size: 2.5rem;
      color: #cacaca;

      :hover {
         cursor: pointer;
      }
   }
`;

export default function AddEpisode({ content, data }: { content: Content; data: string[] }) {
   const mutation = useMutationNewFolder(content, data.length + 1);

   return (
      <Layout onClick={() => mutation.mutate()}>
         <AiOutlinePlus />
      </Layout>
   );
}
