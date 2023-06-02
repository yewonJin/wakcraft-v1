import { handleFetchData } from '../../utils/handleFetchData';

export const getWorldCup = async () => {
   try {
      return await fetch(`/api/worldcup`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
