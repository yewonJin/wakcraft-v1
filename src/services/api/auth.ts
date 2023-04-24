export const login = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      const response = await fetch(`/api/auth/login`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(async response => {
         if (response.status === 401) {
            throw new Error(`${await response.json()}`);
         }
         return response.json();
      });

      return response;
   } catch (error) {
      throw error;
   }
};

export const register = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      const response = await (
         await fetch(`/api/auth/register`, {
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

export const verify = async () => {
   try {
      const response = await (await fetch(`/api/auth/verify`)).json();

      return response;
   } catch (e) {
      console.log(e);
   }
};
