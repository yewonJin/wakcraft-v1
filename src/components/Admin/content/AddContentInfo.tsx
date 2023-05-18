import styled from 'styled-components';

import InputBox from '@/components/Common/InputBox';
import TextBox from '@/components/Common/TextBox';
import { Button } from '@/components/Common/Button';
import { NoobProHacker } from '@/domain/noobProHacker';
import { PlacementTest } from '@/domain/placementTest';

const Layout = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 15px;
`;

const List = styled.ul`
   display: flex;
   gap: 20px;
`;

const Item = styled.li`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 7px;
`;

type Content = Partial<NoobProHacker['contentInfo'] & Omit<PlacementTest, 'participants'>>;

type Props = {
   contentInfo: Content;
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   addContent: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function AddContentInfo(props: Props) {
   const { contentInfo, handleChange, addContent } = props;

   return (
      <Layout>
         <List>
            <Item>
               <TextBox
                  text={Object.keys(contentInfo).includes('season') ? '시즌' : '회차'}
                  fontSize="18px"
                  fontWeight="32px"
               />
               <InputBox
                  onChange={handleChange}
                  value={determinationContentValue(contentInfo)}
                  name={determinationContentName(contentInfo)}
                  type="number"
                  width="60px"
               />
            </Item>
            {Object.keys(contentInfo).includes('main_subject') && (
               <Item>
                  <TextBox text="메인 주제" fontSize="18px" fontWeight="32px" />
                  <InputBox
                     onChange={handleChange}
                     value={contentInfo.main_subject}
                     type="text"
                     name="main_subject"
                     width="150px"
                  />
               </Item>
            )}
            <Item>
               <TextBox text="날짜" fontSize="18px" fontWeight="32px" />
               <InputBox onChange={handleChange} value={contentInfo.date} name="date" type="date" />
            </Item>
            <Item>
               <TextBox text="유튜브 링크" fontSize="18px" fontWeight="32px" />
               <InputBox
                  onChange={handleChange}
                  value={contentInfo.youtube_url}
                  type="text"
                  name="youtube_url"
                  width="300px"
               />
            </Item>
         </List>
         <Button
            text="DB에 추가하기"
            onClick={addContent}
            padding="12px 20px"
            backgroundColor="#797979"
            hoverBackgroundColor="#474747"
         ></Button>
      </Layout>
   );
}

const determinationContentValue = (contentInfo: Content) => {
   if (Object.keys(contentInfo).includes('episode')) {
      const noobProHacker = contentInfo as NoobProHacker['contentInfo'];

      return noobProHacker.episode;
   } else if (Object.keys(contentInfo).includes('season')) {
      const placementTest = contentInfo as Omit<PlacementTest, 'participants'>;

      return placementTest.season;
   }
};

const determinationContentName = (contentInfo: Content) => {
   if (Object.keys(contentInfo).includes('season')) {
      return 'season';
   } else if (Object.keys(contentInfo).includes('episode')) {
      return 'episode';
   } else {
      return '';
   }
};
