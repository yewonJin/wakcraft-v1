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
import { ArchitectureContest } from '@/domain/architectureContest';

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
   architectureContestLine: ArchitectureContest['lineInfo'];
   changeCommonLineInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
   changeLineDetails: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
   resetLine: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   resetImage: (index: number) => void;
   setLineImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
};

export function AddLineDetails(props: Props) {
   const {
      architectureContestLine,
      tierCountPerLine,
      changeCommonLineInfo,
      changeLineDetails,
      resetLine,
      setLineImage,
      resetImage,
   } = props;

   const { curLineIndex } = useCreateLine();

   const { isViewable } = useAwsStorage();

   return (
      <Layout>
         {isViewable && <AwsStorage content="architectureContest" />}
         <Container>
            <Wrapper>
               <InputBox
                  type="text"
                  onChange={changeCommonLineInfo}
                  value={architectureContestLine[curLineIndex].line}
                  name="line"
                  width="150px"
                  height="40px"
                  placeholder="라인 이름"
                  border="none"
                  borderBottom="1px solid #cacaca"
               />
            </Wrapper>
            <Wrapper>
               <InputBox
                  onChange={changeCommonLineInfo}
                  value={architectureContestLine[curLineIndex].youtube_url}
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
            {new Array(7).fill(0).map((item, index) => (
               <LineItem key={index}>
                  <Wrapper>
                     <TextBox text="마인크래프트 아이디 : " />
                     <TextBox
                        fontWeight="500"
                        text={
                           architectureContestLine[curLineIndex]?.line_details
                              ? architectureContestLine[curLineIndex].line_details[index].minecraft_id
                              : ''
                        }
                     />
                  </Wrapper>
                  <Wrapper>
                     <TextBox text={'위에 글자 ex) 캐릭터 명'} fontSize="16px" />
                     <InputBox
                        type="text"
                        height="35px"
                        border="1px solid #aaa"
                        onChange={e => changeLineDetails(e, index)}
                        value={architectureContestLine[curLineIndex].line_details[index].topText}
                        name="topText"
                        width="250px"
                     />
                  </Wrapper>
                  <Wrapper>
                     <TextBox text={'아래 글자(메인) ex) 기술 명'} fontSize="16px" />
                     <InputBox
                        type="text"
                        height="35px"
                        border="1px solid #aaa"
                        onChange={e => changeLineDetails(e, index)}
                        value={architectureContestLine[curLineIndex].line_details[index].bottomText}
                        name="bottomText"
                        width="250px"
                     />
                  </Wrapper>
                  <LineInfoBox>
                     <Wrapper flexDirection="column">
                        {architectureContestLine[curLineIndex].line_details[index].image_url === '' ? (
                           <Fragment>
                              <TextBox text="개인 이미지 링크" fontSize="18px" lineHeight="26px" />
                              <Button text="파일 찾기" padding="8px 0px" onClick={e => setLineImage(e, index)} />
                           </Fragment>
                        ) : (
                           <ImageBox>
                              <Image
                                 fill
                                 src={architectureContestLine[curLineIndex].line_details[index].image_url}
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
                           value={architectureContestLine[curLineIndex].line_details[index].youtube_url}
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
                           value={architectureContestLine[curLineIndex].line_details[index].ranking}
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
