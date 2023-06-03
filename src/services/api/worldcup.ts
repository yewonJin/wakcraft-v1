import { handleFetchData } from '../../utils/handleFetchData';

export const getWorldCup = async () => {
   try {
      return await fetch(`/api/worldcup`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const increaseWinnerCount = async (subject: string) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/worldcup`, {
         method: 'PATCH',
         body: JSON.stringify(subject),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const resetCount = async () => {
   try {
      return await fetch(`/api/worldcup?reset=true`, {
         method: 'PATCH',
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
