import styled from 'styled-components';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateLineInfo } from '@/application/createNoobProHacker';
import { translateTier } from '@/utils/lib';

const Layout = styled.div`
   width: calc(100% - 350px);
   display: flex;
   flex-direction: column;
   gap: 15px;
   padding: 15px;
   box-sizing: border-box;
   background-color: #cacaca;
`;

const Container = styled.div`
   display: flex;
   gap: 20px;
`;

const Wrapper = styled.div<{ flexDirection?: string }>`
   display: flex;
   flex-direction: ${props => props.flexDirection || 'row'};
   gap: 10px;
`;

const LineList = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 10px;
   height: 100%;
`;

const LineItem = styled.li`
   padding: 20px;
   list-style: none;
   max-height: 33%;
   background-color: white;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const LineInfoBox = styled.div`
   display: flex;
   gap: 20px;
`;

type LineType = 'noob' | 'pro' | 'hacker';

const lineArr: LineType[] = ['noob', 'pro', 'hacker'];

export function AddLineDetails() {
   const {
      lineInfo,
      curLineIndex,
      resetLineInfo,
      handleLineDetailsChange: handleChange,
      addLineInfo,
   } = useCreateLineInfo();

   return (
      <Layout>
         <Container>
            <Wrapper>
               <TextBox text="라인 주제" fontSize="18px" lineHeight="26px" />
               <InputBox
                  type="text"
                  onChange={handleChange}
                  value={lineInfo[curLineIndex].subject}
                  name="subject"
                  width="120px"
               />
            </Wrapper>
            <Wrapper>
               <TextBox text="라인 랭킹" fontSize="18px" lineHeight="26px" />
               <InputBox
                  onChange={handleChange}
                  value={lineInfo[curLineIndex].line_ranking}
                  name="line_ranking"
                  type="number"
                  width="120px"
               />
            </Wrapper>
            <Wrapper>
               <TextBox text="유튜브 링크" fontSize="18px" lineHeight="26px" />
               <InputBox
                  onChange={handleChange}
                  value={lineInfo[curLineIndex].youtube_url}
                  name="youtube_url"
                  type="string"
                  width="120px"
               />
            </Wrapper>
            <button onClick={resetLineInfo}>라인 삭제</button>
         </Container>
         <LineList>
            {lineArr.map(item => (
               <LineItem key={item}>
                  <TextBox text={translateTier(item)} fontSize="24px" lineHeight="32px" fontWeight="500" />
                  <Wrapper>
                     <TextBox text="마인크래프트 아이디 : " />
                     <TextBox
                        fontWeight="500"
                        text={
                           lineInfo[curLineIndex]?.line_details
                              ? lineInfo[curLineIndex].line_details[item].minecraft_id
                              : ''
                        }
                     />
                  </Wrapper>
                  <LineInfoBox>
                     <Wrapper flexDirection="column">
                        <TextBox text="이미지 링크" fontSize="18px" lineHeight="26px" />
                        <InputBox
                           type="text"
                           onChange={e => handleChange(e, item)}
                           value={lineInfo[curLineIndex].line_details[item].image_url}
                           name="image_url"
                           width="250px"
                        />
                     </Wrapper>
                     <Wrapper flexDirection="column">
                        <TextBox text="유튜브" fontSize="18px" lineHeight="26px" />
                        <InputBox
                           type="text"
                           onChange={e => handleChange(e, item)}
                           value={lineInfo[curLineIndex].line_details[item].youtube_url}
                           name="youtube_url"
                           width="250px"
                        />
                     </Wrapper>
                     <Wrapper flexDirection="column">
                        <TextBox text="개인 랭킹" fontSize="18px" lineHeight="26px" />
                        <InputBox
                           type="text"
                           onChange={e => handleChange(e, item)}
                           value={lineInfo[curLineIndex].line_details[item].ranking}
                           name="ranking"
                           width="150px"
                        />
                     </Wrapper>
                  </LineInfoBox>
               </LineItem>
            ))}
         </LineList>
         <button onClick={addLineInfo}>제출하기</button>
      </Layout>
   );
}
