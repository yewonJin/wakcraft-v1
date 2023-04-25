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
   } catch (e) {
      console.log(e);
   }
};
