import styled from 'styled-components';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import Link from 'next/link';

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
      :hover {
         cursor: pointer;
      }
   }

   > svg {
      z-index: 3;
   }

   > input {
      z-index: 2;
   }
`;

const List = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 8px;
   position: absolute;
   background-color: #f9f9f9;
   border-radius: 10px;
   z-index: 1;
   width: 320px;
   top: 30px;
   padding: 15px 0px;
   box-sizing: border-box;

   a > li {
      list-style: none;
      padding: 0px 15px;
   }

   > li {
      list-style: none;
      padding: 0px 15px;
   }
`;

type PropsType = {
   handleClick?: (minecraft_id: string, wakzoo_id: string, tier: string) => void;
};

export function SearchArchitect({ handleClick }: PropsType) {
   const { searchData, input, handleChange, resetInput } = useShowArchitect();

   if (!searchData)
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
            <IoIosClose onClick={() => resetInput()} />
         </Layout>
      );

   if (handleClick) {
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
            <List>
               {searchData.map(item => {
                  return (
                     <li
                        key={item.minecraft_id}
                        onClick={e => handleClick(item.minecraft_id, item.wakzoo_id, item.tier[item.tier.length-1])}
                     >
                        {item.minecraft_id + ' / ' + item.wakzoo_id + ' / ' + item.tier[item.tier.length-1]}
                     </li>
                  );
               })}
            </List>
            <IoIosClose onClick={() => resetInput()} />
         </Layout>
      );
   }

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
         <List>
            {searchData.map(item => {
               return (
                  <Link href={`/search/${item.minecraft_id}`} key={item.minecraft_id}>
                     <li>{item.minecraft_id + ' / ' + item.wakzoo_id + ' / ' + item.tier[item.tier.length-1]}</li>
                  </Link>
               );
            })}
         </List>
         <IoIosClose onClick={() => resetInput()} />
      </Layout>
   );
}
