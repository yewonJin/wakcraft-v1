import styled from 'styled-components';

import { translateTier } from '@/utils/lib';

const Layout = styled.span<{ tier: string }>`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 53px;
   border-radius: 10px;
   font-size: 16px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: ${props => setBackground(props.tier)};
`;

const setBackground = (tier: string) => {
   switch (tier) {
      case 'noob':
         return 'rgb(198,142,83)';
      case 'pro':
         return 'rgb(59, 157, 177)';
      case 'hacker':
         return 'rgb(177, 41, 98)';
      default:
         return '#414141';
   }
};

type Props = {
   tier: string;
};

export default function TierBox(props: Props) {
   const { tier } = props;

   return <Layout tier={tier}>{translateTier(tier)}</Layout>;
}
