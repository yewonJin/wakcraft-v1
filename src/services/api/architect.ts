import { handleFetchData } from '../../utils/handleFetchData';

export const getArchitectById = async (id: string) => {
   return await fetch(`/api/architect?id=${id}`).then(handleFetchData);
};

export const getArchitects = async () => {
   return await fetch(`/api/architect`).then(handleFetchData);
};

export const getArchitectByTier = async (tier: string) => {
   try {
      return await fetch(`/api/architect?tier=${tier}`).then(handleFetchData);
   } catch (e) {
      console.error(e);
   }
};

export const getArchitectByFuzzySearch = async (search: string) => {
   if (!search) return;

   try {
      return await fetch(`/api/architect?search=${search}`).then(handleFetchData);
   } catch (e) {
      console.error(e);
   }
};

export const getArchitectsWithoutPortfolio = async () => {
   return await fetch(`/api/architect?portfolio=false`).then(handleFetchData);
};

export const addArchitects = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/architect`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const updateArchitect = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/architect`, {
         method: 'PATCH',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (e) {
      console.log(e);
   }
};
