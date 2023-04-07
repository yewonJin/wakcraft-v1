import styled from 'styled-components';

import { useCreateContentInfo } from '@/application/createNoobProHacker';
import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';

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
   const { contentInfo, handleChange } = useCreateContentInfo();

   return (
      <ListLayout>
         <ListItem>
            <TextBox text="회차" fontSize="18px" fontWeight="32px" />
            <InputBox onChange={handleChange} value={contentInfo.episode} name="episode" type="number" width="60px" />
         </ListItem>
         <ListItem>
            <TextBox text="메인 주제" fontSize="18px" fontWeight="32px" />
            <InputBox
               onChange={handleChange}
               value={contentInfo.main_subject}
               type="text"
               name="main_subject"
               width="150px"
            />
         </ListItem>
         <ListItem>
            <TextBox text="날짜" fontSize="18px" fontWeight="32px" />
            <InputBox onChange={handleChange} value={contentInfo.date} name="date" type="date" />
         </ListItem>
         <ListItem>
            <TextBox text="유튜브 링크" fontSize="18px" fontWeight="32px" />
            <InputBox
               onChange={handleChange}
               value={contentInfo.youtube_url}
               type="text"
               name="youtube_url"
               width="300px"
            />
         </ListItem>
      </ListLayout>
   );
}
