import { handleFetchData } from '../../utils/handleFetchData';
import { PlacementTest } from '@/domain/placementTest';

export const addPlacementTest = async (body: PlacementTest) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/placementTest`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const getPlacementTestById = async (id: string) => {
   try {
      return await fetch(`/api/placementTest?season=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
