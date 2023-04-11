import styled from 'styled-components';

import { useShowArchitect } from '@/application/showArchitect';
import TextBox from '../Common/TextBox';

const NavItem = styled.div<{ curTier: string }>`
   display: flex;
   align-items: center;
   gap: 10px;
   padding: 12px 14px;
   border-radius: 15px;
   background-color: ${props => (props.id === props.curTier ? '#aaa' : '')};
   :hover {
      cursor: pointer;
      background-color: #aaa;
   }
`;

const LineCount = styled.span`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px 10px;
   border-radius: 10px;
   background-color: #cacaca;
`;

const Layout = styled.ul`
   display: flex;
   align-items: center;
   gap: 15px;
`;

export function LineNav() {
   const { curTier, setNavCurrentTier } = useShowArchitect();

   return (
      <Layout>
         <NavItem id="hacker" curTier={curTier} onClick={() => setNavCurrentTier('hacker')}>
            <TextBox text="해커" />
            <LineCount>12</LineCount>
         </NavItem>
         <NavItem id="gukbap" curTier={curTier} onClick={() => setNavCurrentTier('gukbap')}>
            <TextBox text="국밥" />
            <LineCount>24</LineCount>
         </NavItem>
         <NavItem id="pro" curTier={curTier} onClick={() => setNavCurrentTier('pro')}>
            <TextBox text="프로" />
            <LineCount>36</LineCount>
         </NavItem>
         <NavItem id="gyeruik" curTier={curTier} onClick={() => setNavCurrentTier('gyeruik')}>
            <TextBox text="계륵" />
            <LineCount>48</LineCount>
         </NavItem>
         <NavItem id="noob" curTier={curTier} onClick={() => setNavCurrentTier('noob')}>
            <TextBox text="눕" />
            <LineCount>60</LineCount>
         </NavItem>
      </Layout>
   );
}
