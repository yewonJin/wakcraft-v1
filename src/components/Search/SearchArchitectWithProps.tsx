import styled from 'styled-components';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import Link from 'next/link';

import InputBox from '../Common/InputBox';
import { useShowArchitect } from '@/application/showArchitect';
import { Architect } from '@/domain/architect';
import { useState } from 'react';
import { fuzzySearch, fuzzySearchRegExp } from '@/utils/fuzzySearch';

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
   architects?: Architect[];
};

export function SearchArchitectWithProps({ architects }: PropsType) {
   const [input, setInput] = useState('');

   if (!architects) return <div>Loading...</div>;

   if (input === '')
      return (
         <Layout>
            <IoIosSearch />
            <InputBox
               type="text"
               name="search"
               value={input}
               onChange={e => setInput(e.target.value)}
               width="320px"
               height="40px"
               borderRadius="10px"
               border="none"
               backgroundColor="#F5F5F5"
               padding="0px 20px 0px 45px"
            />

            <IoIosClose onClick={() => setInput('')} />
         </Layout>
      );

   return (
      <Layout>
         <IoIosSearch />
         <InputBox
            type="text"
            name="search"
            value={input}
            onChange={e => setInput(e.target.value)}
            width="320px"
            height="40px"
            borderRadius="10px"
            border="none"
            backgroundColor="#F5F5F5"
            padding="0px 20px 0px 45px"
         />
         <List>
            {architects
               .filter(item => {
                  return fuzzySearch(item.minecraft_id + item.wakzoo_id, input);
               })
               .map(item => {
                  const arr = (item.minecraft_id + item.wakzoo_id).split('');

                  const numArr = input.split('').map((item, index) => {
                     if (item.match(/[ㄱ-힣]/g)) {
                        const korInput = fuzzySearchRegExp(item);

                        const a = arr.join('').match(korInput);

                        if (a !== null) {
                           return a.index;
                        }
                     }

                     if (arr.includes(item)) {
                        return arr.indexOf(item, index > 1 ? index - 1 : index);
                     }
                  });

                  return (
                     <Link href={`/search/${item.minecraft_id}`} key={item.minecraft_id}>
                        <li>
                           {(item.minecraft_id + item.wakzoo_id).split('').map((item, index) => (
                              <span
                                 key={index}
                                 style={{
                                    backgroundColor: `${numArr.includes(index) ? 'yellow' : ''}`,
                                    color: `${numArr.includes(index) ? 'red' : ''}`,
                                 }}
                              >
                                 {item}
                              </span>
                           ))}
                        </li>
                     </Link>
                  );
               })}
         </List>
         <IoIosClose onClick={() => setInput('')} />
      </Layout>
   );
}
