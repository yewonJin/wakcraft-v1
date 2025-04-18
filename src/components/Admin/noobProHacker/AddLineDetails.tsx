import styled from 'styled-components';
import Image from 'next/image';

import TextBox from '@/components/Common/TextBox';
import InputBox from '@/components/Common/InputBox';
import { useCreateLine } from '@/application/create/createNoobProHacker';
import { translateTier } from '@/utils/lib';
import { Button } from '@/components/Common/Button';
import AwsStorage from '@/components/Storage/AwsStorage';
import { useAwsStorage } from '@/application/aws/accessAwsStorage';
import { Fragment } from 'react';
import { IoMdClose } from 'react-icons/io';

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

type LineType = 'noob' | 'pro' | 'hacker';

const lineArr: LineType[] = ['noob', 'pro', 'hacker'];

export function AddLineDetails() {
   const { setLineImage, noobProHackerLine, curLineIndex, resetLine, changeLineDetails, changeLineCommonInfo, addNewLine, resetImage,  } =
      useCreateLine();

   const { isViewable } = useAwsStorage();

   return (
      <Layout>
         {isViewable && <AwsStorage content="noobProHacker" />}
         <Container>
            <Wrapper>
               <InputBox
                  type="text"
                  onChange={changeLineCommonInfo}
                  value={noobProHackerLine[curLineIndex].subject}
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
                  onChange={changeLineCommonInfo}
                  value={noobProHackerLine[curLineIndex].line_ranking}
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
                  onChange={changeLineCommonInfo}
                  value={noobProHackerLine[curLineIndex].youtube_url}
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
            {lineArr.map(item => (
               <LineItem key={item}>
                  <TextBox text={translateTier(item)} fontSize="24px" lineHeight="32px" fontWeight="500" />
                  <Wrapper>
                     <TextBox text="마인크래프트 아이디 : " />
                     <TextBox
                        fontWeight="500"
                        text={
                           noobProHackerLine[curLineIndex]?.line_details
                              ? noobProHackerLine[curLineIndex].line_details[item].minecraft_id
                              : ''
                        }
                     />
                  </Wrapper>
                  <LineInfoBox>
                     <Wrapper flexDirection="column">
                        {noobProHackerLine[curLineIndex].line_details[item].image_url === '' ? (
                           <Fragment>
                              <TextBox text="개인 이미지 링크" fontSize="18px" lineHeight="26px" />
                              <Button onClick={e => setLineImage(e, item)} text="파일 찾기" padding="8px 0px" />
                           </Fragment>
                        ) : (
                           <ImageBox>
                              <Image
                                 fill
                                 src={noobProHackerLine[curLineIndex].line_details[item].image_url}
                                 alt="image"
                              />
                              <ResetImage onClick={() => resetImage(item)}>
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
                           onChange={e => changeLineDetails(e, item)}
                           value={noobProHackerLine[curLineIndex].line_details[item].youtube_url}
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
                           onChange={e => changeLineDetails(e, item)}
                           value={noobProHackerLine[curLineIndex].line_details[item].ranking}
                           name="ranking"
                           width="150px"
                        />
                     </Wrapper>
                  </LineInfoBox>
               </LineItem>
            ))}
         </LineList>
         <Button
            text="라인 추가"
            onClick={addNewLine}
            backgroundColor="#797979"
            hoverBackgroundColor="#474747"
         ></Button>
      </Layout>
   );
}
