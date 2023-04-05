import styled from 'styled-components';

const LineInfoLayout = styled.div`
   > ul {
      height: 80px;
      padding: 5px 5px;
      background-color: #cacaca;
      display: flex;
      gap: 10px;
      > li {
         padding: 25px 20px;
         background-color: white;
         list-style: none;
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
}


export function NoobProHackerLineInfo({value}: {value: LineInfo[]}) {
   return (
      <LineInfoLayout>
         <ul>
            {value.map((item) => {
               return item.subject
            })}
         </ul>
         <div></div>
      </LineInfoLayout>
   );
}
