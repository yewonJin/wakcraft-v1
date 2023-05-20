import styled from 'styled-components';
import Image from 'next/image';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateLine } from '@/application/createNoobProHacker';
import { Button } from '@/components/Common/Button';
import AwsStorage from '@/components/Storage/AwsStorage';
import { useAwsStorage } from '@/application/accessAwsStorage';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';

const Layout = styled.div`
   width: calc(100% - 350px);
   display: flex;
   flex-direction: column;
   gap: 15px;
   padding: 15px;
   box-sizing: border-box;
   border: 1px solid #cacaca;
`;

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 20px;
`;

const Wrapper = styled.div<{ flexDirection?: string }>`
   position: relative;
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
   background-color: #ddd;
   display: flex;
   flex-direction: column;
   gap: 15px;
`;

const LineInfoBox = styled.div`
   display: flex;
   gap: 20px;
`;

type Props = {
   architectCountPerLine: number;
   eventNoobProHackerLine: EventNoobProHacker['lineInfo'];
   changeLine: (e: React.ChangeEvent<HTMLInputElement>) => void;
   changeLineDetails: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
   resetLine: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   setLineImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
};

export function AddLineDetails(props: Props) {
   const { eventNoobProHackerLine, architectCountPerLine, changeLine, changeLineDetails, resetLine, setLineImage } =
      props;

   const { curLineIndex } = useCreateLine();

   const { isViewable } = useAwsStorage();

   return (
      <Layout>
         {isViewable && <AwsStorage content="eventNoobProHacker" />}
         <Container>
            <Wrapper>
               <InputBox
                  type="text"
                  onChange={changeLine}
                  value={eventNoobProHackerLine[curLineIndex].subject}
                  name="subject"
                  width="150px"
                  height="40px"
                  placeholder="라인 주제"
                  border="none"
                  borderBottom="1px solid #cacaca"
               />
            </Wrapper>
            <Wrapper>
               <InputBox
                  onChange={changeLine}
                  value={eventNoobProHackerLine[curLineIndex].line_ranking}
                  name="line_ranking"
                  type="number"
                  width="100px"
                  height="40px"
                  placeholder="라인 랭킹"
                  border="none"
                  borderBottom="1px solid #cacaca"
               />
            </Wrapper>
            <Wrapper>
               <InputBox
                  onChange={changeLine}
                  value={eventNoobProHackerLine[curLineIndex].youtube_url}
                  name="youtube_url"
                  type="string"
                  width="250px"
                  height="40px"
                  placeholder="유튜브 링크"
                  border="none"
                  borderBottom="1px solid #cacaca"
               />
            </Wrapper>
            <Button
               text="라인 초기화"
               padding="10px 23px"
               onClick={resetLine}
               backgroundColor="#797979"
               hoverBackgroundColor="#474747"
            ></Button>
         </Container>
         <LineList>
            {new Array(architectCountPerLine).fill(0).map((item, index) => (
               <LineItem key={'1' + index}>
                  <Wrapper>
                     <TextBox text={eventNoobProHackerLine[curLineIndex].line_details[index].line} fontSize="20px" />
                  </Wrapper>
                  <Wrapper>
                     <TextBox text="마인크래프트 아이디 : " />
                     <TextBox
                        fontWeight="500"
                        text={
                           eventNoobProHackerLine[curLineIndex]?.line_details
                              ? eventNoobProHackerLine[curLineIndex].line_details[index].minecraft_id
                              : ''
                        }
                     />
                  </Wrapper>
                  <LineInfoBox>
                     <Wrapper flexDirection="column">
                        <TextBox text="개인 이미지 링크" fontSize="18px" lineHeight="26px" />
                        {eventNoobProHackerLine[curLineIndex].line_details[index].image_url === '' ? (
                           <Button text="파일 찾기" padding="8px 0px" onClick={e => setLineImage(e, index)} />
                        ) : (
                           <Image
                              fill
                              src={eventNoobProHackerLine[curLineIndex].line_details[index].image_url}
                              alt="image"
                           />
                        )}
                     </Wrapper>
                     <Wrapper flexDirection="column">
                        <TextBox text="개인 유튜브 링크" fontSize="18px" lineHeight="26px" />
                        <InputBox
                           type="text"
                           height="35px"
                           border="1px solid #aaa"
                           onChange={e => changeLineDetails(e, index)}
                           value={eventNoobProHackerLine[curLineIndex].line_details[index].youtube_url}
                           name="youtube_url"
                           width="250px"
                        />
                     </Wrapper>
                     <Wrapper flexDirection="column">
                        <TextBox text="개인 랭킹" fontSize="18px" lineHeight="26px" />
                        <InputBox
                           type="text"
                           height="35px"
                           border="1px solid #aaa"
                           onChange={e => changeLineDetails(e, index)}
                           value={eventNoobProHackerLine[curLineIndex].line_details[index].ranking}
                           name="ranking"
                           width="150px"
                        />
                     </Wrapper>
                  </LineInfoBox>
               </LineItem>
            ))}
         </LineList>
      </Layout>
   );
}

/* 
   <Button
      text="라인 추가"
      onClick={addNewLine}
      backgroundColor="#797979"
      hoverBackgroundColor="#474747"
   ></Button>
*/
