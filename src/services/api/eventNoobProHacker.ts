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
