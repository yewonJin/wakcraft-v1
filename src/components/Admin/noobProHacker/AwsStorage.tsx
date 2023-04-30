import { Suspense, useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import styled from 'styled-components';
import { RiFolder3Fill } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';

import TextBox from '@/components/Common/TextBox';
import ImageList from './ImageList';

const Layout = styled.div`
   padding: 25px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 3;
   background-color: rgba(0, 0, 0, 0.8);
   width: 1200px;
   height: 800px;
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

export default function AwsStorage() {
   const [page, setPage] = useState(0);

   const { data }: UseQueryResult<string[]> = useQuery(
      'getNoobProHackerDirectory',
      () => fetch('/api/aws').then(res => res.json()),
      {
         refetchOnWindowFocus: false,
      },
   );

   if (!data) return <div></div>;

   console.log(data);

   if (page == 0) {
      return (
         <Layout>
            <TextBox
               text="파일 선택"
               fontSize="24px"
               fontWeight="500"
               lineHeight="36px"
               color="white"
               margin="0px 0px 10px 0px"
            />
            <EpisodeList>
               {data.map((item, index) => (
                  <EpisodeItem key={item + index} onClick={() => setPage(index + 1)}>
                     <RiFolder3Fill />
                     <TextBox text={item + '화'} color="#ccc" fontSize="18px" lineHeight="26px" />
                  </EpisodeItem>
               ))}
            </EpisodeList>
         </Layout>
      );
   } else {
      return (
         <Layout>
            <Wrapper>
               <TextBox
                  text="파일 선택"
                  textAlign="center"
                  fontSize="24px"
                  fontWeight="500"
                  lineHeight="36px"
                  color="white"
               />
               <BiArrowBack onClick={() => setPage(0)} />
            </Wrapper>
            <Suspense>
               <ImageList page={page} />
            </Suspense>
         </Layout>
      );
   }
}
