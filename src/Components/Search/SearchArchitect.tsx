import styled from 'styled-components';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

import InputBox from '../Common/InputBox';
import { useShowArchitect } from '@/application/showArchitect';

const Layout = styled.div`
   position: relative;
   display: flex;
   align-items: center;

   > svg:first-child {
      position: absolute;
      left: 10px;
      font-size: 1.5rem;
   }

   > svg:last-child {
      position: absolute;
      right: 10px;
      font-size: 1.5rem;
   }
`;

export function SearchArchitect() {
   const { input, handleChange } = useShowArchitect();

   return (
      <Layout>
         <IoIosSearch />
         <InputBox
            type="text"
            name="search"
            value={input}
            onChange={handleChange}
            width="320px"
            height="40px"
            borderRadius="10px"
            border="none"
            backgroundColor="#F5F5F5"
            padding="0px 20px 0px 45px"
         />
         <IoIosClose />
      </Layout>
   );
}
