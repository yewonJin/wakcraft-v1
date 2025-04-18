import Link from 'next/link';
import styled from 'styled-components';

import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';

const List = styled.ul`
   display: flex;
   gap: 20px;
   margin-top: 20px;

   > a > li {
      list-style: none;
      font-size: 20px;
      padding: 0px 20px;
   }
`;

const Divider = styled.span`
   width: 1px;
   height: 30px;
   background-color: #cacaca;
`;

export default function Index() {
   return (
      <CommonLayout>
         <TextBox text="어드민 페이지" fontSize="24px" lineHeight="36px" fontWeight="500" />
         <List>
            <Link href={'/admin/architect'}>
               <li>건축가</li>
            </Link>
            <Divider />
            <Link href={'/admin/noobProHacker'}>
               <li>눕프로해커</li>
            </Link>
            <Divider />
            <Link href={'/admin/placementTest'}>
               <li>배치고사</li>
            </Link>
            <Divider />
            <Link href={'/admin/eventNoobProHacker'}>
               <li>이벤트 눕프핵</li>
            </Link>
            <Divider />
            <Link href={'/admin/architectureContest'}>
               <li>건축 콘테스트</li>
            </Link>
            <Divider />
            <Link href={'/admin/matchYourTier'}>
               <li>티어 맞추기</li>
            </Link>
            <Divider />
            <Link href={'/admin/worldcup'}>
               <li>월드컵</li>
            </Link>
         </List>
      </CommonLayout>
   );
}
