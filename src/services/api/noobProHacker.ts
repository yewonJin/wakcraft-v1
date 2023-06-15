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

export const editNoobProHacker = async (body: NoobProHacker) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/noobProHacker`, {
         method: 'PUT',
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

export const getNoobProHackerWithoutLine = async () => {
   try {
      return await fetch(`/api/noobProHacker?line=false`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
