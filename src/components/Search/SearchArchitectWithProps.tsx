import styled from 'styled-components';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import Link from 'next/link';

import InputBox from '../Common/InputBox';
import { useShowArchitect } from '@/application/showArchitect';
import { Architect } from '@/domain/architect';

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

   a > li {
      display: flex;
      gap: 8px;
      list-style: none;
      padding: 0px 15px;
   }
`;

type PropsType = {
   architects?: Architect[];
};

export function SearchArchitectWithProps({ architects }: PropsType) {
   const { input, handleChange, resetInput, fuzzySearchAndHighlightResult } = useShowArchitect();

   if (!architects) return <div>Loading...</div>;

   if (input === '')
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

            <IoIosClose onClick={resetInput} />
         </Layout>
      );

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
            {fuzzySearchAndHighlightResult(architects, input).map(architect => {
               return (
                  <Link href={`/search/${architect.minecraft_id}`} key={architect.minecraft_id}>
                     <li>
                        <p>
                           {architect.minecraft_id.split('').map((item, index) => (
                              <span
                                 key={index}
                                 style={{
                                    backgroundColor: `${
                                       architect.minecraftHighlightIndex.includes(index) ? 'yellow' : ''
                                    }`,
                                    color: `${architect.minecraftHighlightIndex.includes(index) ? 'red' : ''}`,
                                 }}
                              >
                                 {item}
                              </span>
                           ))}
                        </p>
                        <p>
                           {architect.wakzoo_id.split('').map((item, index) => (
                              <span
                                 key={index}
                                 style={{
                                    backgroundColor: `${
                                       architect.wakzooHighlightIndex.includes(index) ? 'yellow' : ''
                                    }`,
                                    color: `${architect.wakzooHighlightIndex.includes(index) ? 'red' : ''}`,
                                 }}
                              >
                                 {item}
                              </span>
                           ))}
                        </p>
                     </li>
                  </Link>
               );
            })}
         </List>
         <IoIosClose onClick={resetInput} />
      </Layout>
   );
}
