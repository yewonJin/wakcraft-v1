import { NoobProHacker } from '@/domain/noobProHacker';

export const addNoobProHacker = async (body: NoobProHacker) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      const response = await (
         await fetch(`/api/noobProHacker`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: myHeaders,
         })
      ).json();

      return response;
   } catch (e) {
      console.log(e);
   }
};
