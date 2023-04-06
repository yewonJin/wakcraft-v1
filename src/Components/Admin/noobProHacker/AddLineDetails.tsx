import { NoobProHacker } from '@/Domain/noobProHacker';
import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { checkEmptyInDeepObject, translateTier } from '@/utils/lib';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   flex: 2;
   gap: 10px;
   padding: 15px;
   background-color: #cacaca;
`;

const Container = styled.div`
   display: flex;
   gap: 20px;

   > div {
      display: flex;
      gap: 10px;
   }
`;

const LineList = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 10px;
   height: 100%;

   > li {
      padding: 20px;
      list-style: none;
      max-height: 33%;
      flex: 1;
      background-color: white;
      display: flex;
      flex-direction: column;
      gap: 15px;
   }
`;

const LineInfoBox = styled.div`
   display: flex;
   gap: 20px;
`;

const InputBox = styled.input<{ width?: string }>`
   width: ${props => props.width || '150px'};
`;

type LineType = 'noob' | 'pro' | 'hacker';

const lineArr: LineType[] = ['noob', 'pro', 'hacker'];

export function AddLineDetails({
   value,
   setValue,
   currentLineIndex,
   handleClick,
   setEmptyState,
}: {
   value: NoobProHacker['lineInfo'];
   setValue: Dispatch<SetStateAction<NoobProHacker['lineInfo']>>;
   currentLineIndex: number;
   handleClick: (num: number) => void;
   setEmptyState: (boo: boolean) => void;
}) {
   const handleCommonChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newArr = [...value];

      switch (e.target.name) {
         case 'subject':
            newArr[currentLineIndex].subject = e.target.value;
            setValue(newArr);
            return;

         case 'line_ranking':
            newArr[currentLineIndex].line_ranking = parseInt(e.target.value);
            setValue(newArr);
            return;

         case 'youtube_url':
            newArr[currentLineIndex].youtube_url = e.target.value;
            setValue(newArr);
            return;
      }
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>, line: 'noob' | 'pro' | 'hacker') => {
      const newArr = [...value];

      switch (e.target.name) {
         case 'image_url':
            newArr[currentLineIndex].line_details[line].image_url = e.target.value;
            setValue(newArr);

            return;

         case 'ranking':
            newArr[currentLineIndex].line_details[line].ranking = parseInt(e.target.value);
            setValue(newArr);

            return;

         case 'youtube_url':
            newArr[currentLineIndex].line_details[line].youtube_url = e.target.value;
            setValue(newArr);

            return;
      }
   };

   return (
      <Layout>
         <Container>
            <div>
               <h3>라인 주제</h3>
               <InputBox
                  onChange={handleCommonChange}
                  value={value[currentLineIndex].subject}
                  name="subject"
                  width="120px"
               />
            </div>
            <div>
               <h3>라인 랭킹</h3>
               <InputBox
                  onChange={handleCommonChange}
                  value={value[currentLineIndex].line_ranking}
                  name="line_ranking"
                  type="number"
                  width="120px"
               />
            </div>
            <div>
               <h3>유튜브 주소</h3>
               <InputBox
                  onChange={handleCommonChange}
                  value={value[currentLineIndex].youtube_url}
                  name="youtube_url"
                  type="string"
                  width="120px"
               />
            </div>
         </Container>
         <LineList>
            {lineArr.map(item => (
               <li key={item}>
                  <h2>{translateTier(item)}</h2>
                  마인크래프트 아이디 :
                  {value[currentLineIndex]?.line_details ? value[currentLineIndex].line_details[item].minecraft_id : ''}
                  <LineInfoBox>
                     <div>
                        <h3>이미지 링크</h3>
                        <InputBox
                           onChange={e => handleChange(e, item)}
                           value={value[currentLineIndex].line_details[item].image_url}
                           name="image_url"
                           width="150px"
                        />
                     </div>
                     <div>
                        <h3>유튜브 링크</h3>
                        <InputBox
                           onChange={e => handleChange(e, item)}
                           value={value[currentLineIndex].line_details[item].youtube_url}
                           name="youtube_url"
                           width="150px"
                        />
                     </div>
                     <div>
                        <h3>개인 랭킹</h3>
                        <InputBox
                           onChange={e => handleChange(e, item)}
                           value={value[currentLineIndex].line_details[item].ranking}
                           name="ranking"
                           width="150px"
                        />
                     </div>
                  </LineInfoBox>
               </li>
            ))}
         </LineList>
         <button
            onClick={e => {
               e.preventDefault();

               console.log(checkEmptyInDeepObject(value[currentLineIndex]));

               if (checkEmptyInDeepObject(value[currentLineIndex])) {
                  handleClick(currentLineIndex > 5 ? currentLineIndex : currentLineIndex+1);
                  setEmptyState(false);

                  if (value.length < 5) {
                     const newArr = [...value];

                     newArr.push({
                        subject: '',
                        youtube_url: '',
                        line_ranking: 0,
                        line_details: {
                           noob: {
                              minecraft_id: '',
                              image_url: '',
                              youtube_url: '',
                              ranking: 0,
                           },
                           pro: {
                              minecraft_id: '',
                              image_url: '',
                              youtube_url: '',
                              ranking: 0,
                           },
                           hacker: {
                              minecraft_id: '',
                              image_url: '',
                              youtube_url: '',
                              ranking: 0,
                           },
                        },
                     });

                     setValue(newArr);
                  }
               }
            }}
         >
            제출하기
         </button>
      </Layout>
   );
}
