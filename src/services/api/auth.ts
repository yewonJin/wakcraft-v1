import { handleFetchData } from '../../utils/handleFetchData';

export const login = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/auth/login`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const register = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/auth/register`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (e) {
      console.log(e);
   }
};

export const verify = async () => {
   try {
      return await fetch(`/api/auth/verify`).then(handleFetchData);
   } catch (e) {
      console.log(e);
   }
};
