import styled from 'styled-components';

import { useCreateContent, useCreateNoobProHacker } from '@/application/createNoobProHacker';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';

const Layout = styled.div`
   display: flex;
   justify-content: space-between;
`;

const ListLayout = styled.ul`
   display: flex;
   gap: 20px;
`;

const ListItem = styled.li`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 7px;
`;

export function AddNoobProHackerInfo() {
   const { noobProHackerContent, handleChange } = useCreateContent();
   const { addNoobProHacker } = useCreateNoobProHacker();

   return (
      <Layout>
         <ListLayout>
            <ListItem>
               <TextBox text="회차" fontSize="18px" fontWeight="32px" />
               <InputBox
                  onChange={handleChange}
                  value={noobProHackerContent.episode}
                  name="episode"
                  type="number"
                  width="60px"
               />
            </ListItem>
            <ListItem>
               <TextBox text="메인 주제" fontSize="18px" fontWeight="32px" />
               <InputBox
                  onChange={handleChange}
                  value={noobProHackerContent.main_subject}
                  type="text"
                  name="main_subject"
                  width="150px"
               />
            </ListItem>
            <ListItem>
               <TextBox text="날짜" fontSize="18px" fontWeight="32px" />
               <InputBox onChange={handleChange} value={noobProHackerContent.date} name="date" type="date" />
            </ListItem>
            <ListItem>
               <TextBox text="유튜브 링크" fontSize="18px" fontWeight="32px" />
               <InputBox
                  onChange={handleChange}
                  value={noobProHackerContent.youtube_url}
                  type="text"
                  name="youtube_url"
                  width="300px"
               />
            </ListItem>
         </ListLayout>
         <Button
            text="DB에 추가하기"
            onClick={addNoobProHacker}
            padding="12px 20px"
            backgroundColor="#797979"
            hoverBackgroundColor="#474747"
         ></Button>
      </Layout>
   );
}
