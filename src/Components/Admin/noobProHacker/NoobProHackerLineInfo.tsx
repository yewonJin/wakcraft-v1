import styled from 'styled-components';

const LineInfoLayout = styled.div`
   > ul {
      height: 80px;
      padding: 5px 5px;
      background-color: #cacaca;
      display: flex;
      gap: 10px;
      > li {
         width: 20%;
         text-align: center;
         padding: 25px 20px;
         background-color: white;
         list-style: none;
         :hover{
            cursor: pointer;
         }
      }
   }
`;

type LineDetail = {
   minecraft_id: string;
   image_url: string;
   youtube_url: string;
   ranking: number;
};

type LineInfo = {
   subject: string;
   youtube_url: string;
   line_ranking: number;
   line_details: {
      noob: LineDetail;
      pro: LineDetail;
      hacker: LineDetail;
   };
};

export function NoobProHackerLineInfo({
   value,
   handleClick,
}: {
   value: LineInfo[];
   handleClick: (num: number) => void;
}) {
   return (
      <LineInfoLayout>
         <ul>
            {value.map((item, index) => {
               return <li onClick={() => handleClick(index)} key={item.subject}>{index + 1 + '라인 : ' + item.subject}</li>;
            })}
         </ul>
         <div></div>
      </LineInfoLayout>
   );
}
