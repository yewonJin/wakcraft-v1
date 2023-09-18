import styled from 'styled-components';
import Image from 'next/image';
import { Fragment } from 'react';
import { IoMdClose } from 'react-icons/io';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateLine } from '@/application/create/createNoobProHacker';
import { Button } from '@/components/Common/Button';
import AwsStorage from '@/components/Storage/AwsStorage';
import { useAwsStorage } from '@/application/aws/accessAwsStorage';
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

const ImageBox = styled.div`
   width: 130px;
   height: 73px;
   position: relative;
`;

const ResetImage = styled.span`
   position: absolute;
   top: 2px;
   right: 2px;

   > svg {
      font-size: 1.3rem;
      color: white;
      :hover {
         color: #ccc;
         cursor: pointer;
      }
   }
`;

type Props = {
   tierCountPerLine: number;
   eventNoobProHackerLine: EventNoobProHacker['lineInfo'];
   changeCommonLineInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
   changeLineDetails: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
   resetLine: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   resetImage: (index: number) => void;
   setLineImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
   increaseArchitectCount: (index: number) => void;
   decreaseArchitectCount: (index: number) => void;
};

export function AddLineDetails(props: Props) {
   const {
      eventNoobProHackerLine,
      tierCountPerLine,
      changeCommonLineInfo,
      changeLineDetails,
      resetLine,
      setLineImage,
      resetImage,
      increaseArchitectCount,
      decreaseArchitectCount
   } = props;

   const { curLineIndex } = useCreateLine();

   const { isViewable } = useAwsStorage();

   return (
      <Layout>
         {isViewable && <AwsStorage content="eventNoobProHacker" />}
         <Container>
            <Wrapper>
               <InputBox
                  type="text"
                  onChange={changeCommonLineInfo}
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
                  onChange={changeCommonLineInfo}
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
                  onChange={changeCommonLineInfo}
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
            {new Array(tierCountPerLine == 0 ? eventNoobProHackerLine[0].line_details.length : tierCountPerLine)
               .fill(0)
               .map((item, index) => (
                  <LineItem key={'1' + index}>
                     <Wrapper>
                        <InputBox
                           onChange={e => changeLineDetails(e, index)}
                           value={eventNoobProHackerLine[curLineIndex].line_details[index].line}
                           name="line"
                           type="string"
                           width="150px"
                           height="40px"
                           placeholder={eventNoobProHackerLine[curLineIndex].line_details[index].line}
                        />
                     </Wrapper>
                     <Wrapper>
                        <TextBox text="마인크래프트 아이디 : " />
                        <TextBox
                           fontWeight="500"
                           text={
                              eventNoobProHackerLine[curLineIndex]?.line_details
                                 ? eventNoobProHackerLine[curLineIndex].line_details[index].minecraft_id.join(',')
                                 : ''
                           }
                        />
                        <Button onClick={() => increaseArchitectCount(index)} text="+" padding="0px 6px" />
                        <Button onClick={() => decreaseArchitectCount(index)} text="-" padding="0px 8px" />
                        <TextBox text={'총 ' + eventNoobProHackerLine[curLineIndex].line_details[index].minecraft_id.length + '명'}/>
                     </Wrapper>
                     <LineInfoBox>
                        <Wrapper flexDirection="column">
                           {eventNoobProHackerLine[curLineIndex].line_details[index].image_url === '' ? (
                              <Fragment>
                                 <TextBox text="개인 이미지 링크" fontSize="18px" lineHeight="26px" />
                                 <Button text="파일 찾기" padding="8px 0px" onClick={e => setLineImage(e, index)} />
                              </Fragment>
                           ) : (
                              <ImageBox>
                                 <Image
                                    fill
                                    src={eventNoobProHackerLine[curLineIndex].line_details[index].image_url}
                                    alt="image"
                                 />
                                 <ResetImage onClick={() => resetImage(index)}>
                                    <IoMdClose />
                                 </ResetImage>
                              </ImageBox>
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
