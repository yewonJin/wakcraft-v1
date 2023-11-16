import { GuessTime } from '@/domain/guessTime';
import { handleFetchData } from '@/utils/handleFetchData';

export const addGuessTime = async (body: GuessTime) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/guessTime`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
export const getGuessTimeById = async (id: string) => {
   try {
      return await fetch(`/api/guessTime?episode=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
