import { MatchYourTier } from '@/domain/matchYourTier';
import { handleFetchData } from '../../utils/handleFetchData';

export const addMatchYourTier = async (body: MatchYourTier) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/matchYourTier`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
export const getMatchYourTierById = async (id: string) => {
   try {
      return await fetch(`/api/matchYourTier?episode=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
