import { Architect } from '@/domain/architect';
import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { handleFetchData } from '@/utils/handleFetchData';

export const addEventNoobProHacker = async (body: EventNoobProHacker) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/eventNoobProHacker`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const getNoobProHackerById = async (id: string) => {
   try {
      return await fetch(`/api/eventNoobProHacker?episode=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

/** 이벤트 눕프핵 정보를 건축가 정보로 변환하는 함수 */

type ArchitectsInfo = {
   minecraft_id: string;
   portfolio: Pick<Architect['portfolio'], 'eventNoobProHacker'>;
};

export const convertToArchitect = (req: { body: EventNoobProHacker }) => {
   const { contentInfo, lineInfo } = req.body;

   const architectsInfo: ArchitectsInfo[] = [];

   lineInfo.forEach((line, index) => {
      line.line_details.forEach(item => {
         const portfolioInfo: Architect['portfolio']['eventNoobProHacker'][0] = {
            contentName: contentInfo.contentName,
            episode: contentInfo.episode,
            subject: lineInfo[index].subject,
            line: item.line,
            image_url: item.image_url,
            youtube_url: item.youtube_url,
            ranking: item.ranking,
         };

         architectsInfo.push({
            minecraft_id: item.minecraft_id,
            portfolio: {
               eventNoobProHacker: [portfolioInfo],
            },
         });
      });
   });

   return architectsInfo;
};
