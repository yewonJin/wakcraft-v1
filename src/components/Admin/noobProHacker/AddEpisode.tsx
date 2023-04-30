import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import InputBox from '@/components/Common/InputBox';
import { useCreateLineInfo } from '@/application/createNoobProHacker';
import { useMutationNewFolder } from '@/services/awsAdapters';

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

export default function AddEpisode({ data }: { data: string[] }) {
   const mutation = useMutationNewFolder();

   return (
      <Layout onClick={e => mutation.mutate(data.length + 1)}>
         <AiOutlinePlus />
      </Layout>
   );
}

/*


const newValue = {
            ...lineInfo[curLineIndex],
            line_details: {
               ...lineInfo[curLineIndex].line_details,
               [line]: {
                  ...lineInfo[curLineIndex].line_details[line],
                  [e.target.name]: `https://wakcraft.s3.ap-northeast-2.amazonaws.com/${json.imgUrl}`,
               },
            },
         };

         const newArr = replaceItemAtIndex(lineInfo, curLineIndex, newValue);
         setLineInfo(newArr);1
*/
