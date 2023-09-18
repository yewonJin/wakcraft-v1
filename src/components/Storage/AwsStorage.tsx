import { Suspense } from 'react';
import styled from 'styled-components';
import { RiFolder3Fill } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

import TextBox from '@/components/Common/TextBox';
import ImageList from './ImageList';
import CreateFolder from './CreateFolder';
import { useQueryAwsDirectory } from '@/services/awsAdapters';
import UploadFiles from './UploadFiles';
import { useAwsStorage } from '@/application/aws/accessAwsStorage';
import { Content, getContentName } from '@/domain/aws';

const Layout = styled.div`
   padding: 25px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 3;
   background-color: rgba(0, 0, 0, 0.8);
   width: 800px;
   height: 600px;
   overflow-y: scroll;
`;

const EpisodeList = styled.ul`
   display: grid;
   gap: 15px;
   grid-template-columns: repeat(5, 1fr);
   position: relative;
`;

const EpisodeItem = styled.li`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   :hover {
      cursor: pointer;
   }

   :hover > svg {
      scale: 1.02;
   }

   > svg {
      font-size: 4.5rem;
      color: #cacaca;
   }
`;

const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   margin-bottom: 15px;

   > svg {
      font-size: 1.5rem;
      color: white;

      :hover {
         cursor: pointer;
      }
   }
`;

export default function AwsStorage({ content }: { content: Content }) {
   const { storagePage, setStoragePage, setIsViewable, isSelectFolderPage } = useAwsStorage();
   const { data } = useQueryAwsDirectory(content);

   if (!data) return <div></div>;

   if (isSelectFolderPage) {
      return (
         <Layout>
            <Wrapper>
               <TextBox
                  text={getContentName(content)}
                  fontSize="24px"
                  fontWeight="500"
                  lineHeight="36px"
                  color="white"
               />
               <IoMdClose onClick={() => setIsViewable(false)} />
            </Wrapper>
            <EpisodeList>
               {data
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((item, index) => (
                     <EpisodeItem key={item + index} onClick={() => setStoragePage(index + 1)}>
                        <RiFolder3Fill />
                        <TextBox text={item + '화'} color="#ccc" fontSize="18px" lineHeight="26px" />
                     </EpisodeItem>
                  ))}
               <CreateFolder content={content} data={data} />
            </EpisodeList>
         </Layout>
      );
   } else {
      return (
         <Layout>
            <Wrapper>
               <Wrapper>
                  <UploadFiles content={content} page={storagePage} />
               </Wrapper>
               <BiArrowBack onClick={() => setStoragePage(0)} />
            </Wrapper>
            <Suspense>
               <ImageList content={content} />
            </Suspense>
         </Layout>
      );
   }
}
