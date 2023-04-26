import Image from 'next/image';
import styled from 'styled-components';

import hacker from '../../../public/Naruto-hacker.png';
import noob from '../../../public/Naruto-pro.png';
import TextBox from '../Common/TextBox';

const Layout = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   box-sizing: border-box;
   width: 1200px;
`;

const Item = styled.div`
   position: relative;
   width: 350px;
   height: 500px;
   padding-bottom: 20px;
`;

const ImageBox = styled.div`
   position: relative;
   width: 350px;
   height: 450px;

   > img {
      :hover {
         scale: 1.02;
         cursor: pointer;
      }
   }
`;

const TextContainer = styled.div`
   display: flex;
   gap: 10px;
   align-items: end;
   justify-content: center;
   margin-top: 5px;
   padding-left: 15px;
`;

export default function Contents() {
   return (
      <Layout>
         <Item>
            <ImageBox>
               <Image src={noob} fill alt="noob" />
            </ImageBox>
            <TextContainer>
               <TextBox text="닼발" color="white" fontSize="24px" lineHeight="36px" fontWeight="500" />
               <TextBox text="오마카세" color="#999" />
            </TextContainer>
         </Item>
         <Item>
            <ImageBox>
               <Image
                  src="https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode+1/kindred-hacker.png"
                  fill
                  placeholder="empty"
                  alt="pro"
                  style={{ objectFit: 'cover' }}
               />
            </ImageBox>
            <TextContainer>
               <TextBox text="닼발" color="white" fontSize="24px" lineHeight="36px" fontWeight="500" />
               <TextBox text="오마카세" color="#999" />
            </TextContainer>
         </Item>
         <Item>
            <ImageBox>
               <Image src={hacker} fill alt="noob" />
            </ImageBox>
            <TextContainer>
               <TextBox text="닼발" color="white" fontSize="24px" lineHeight="36px" fontWeight="500" />
               <TextBox text="오마카세" color="#999" />
            </TextContainer>
         </Item>
      </Layout>
   );
}
