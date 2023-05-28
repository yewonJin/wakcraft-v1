import { NoobProHacker } from '@/domain/noobProHacker';
import { handleFetchData } from '../../utils/handleFetchData';

export const addNoobProHacker = async (body: NoobProHacker) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/noobProHacker`, {
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
      return await fetch(`/api/noobProHacker?episode=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const getAllWinLine = async () => {
   try {
      return await fetch(`/api/noobProHacker?allWinLine=true`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
