import styled from 'styled-components';

import { translateTier } from '@/utils/lib';

const Layout = styled.span<{ tier: 'noob' | 'pro' | 'hacker' }>`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 90px;
   height: 53px;
   border-radius: 10px;
   font-size: 18px;
   color: white;
   text-shadow: 1px 1px 2px black;
   background: ${props =>
      props.tier === 'hacker' ? 'rgb(177, 41, 98)' : props.tier === 'pro' ? 'rgb(59, 157, 177)' : 'rgb(198,142,83)'};
`;

type Props = {
   tier: 'noob' | 'pro' | 'hacker';
};

export default function TierBox(props: Props) {
   const { tier } = props;

   return <Layout tier={tier}>{translateTier(tier)}</Layout>;
}
