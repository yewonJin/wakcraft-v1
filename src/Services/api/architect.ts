export const getArchitectById = async (id: string) => {
   const response = await (await fetch(`http://localhost:4000/architects/${id}`)).json();

   return response;
};

export const getArchitects = async () => {
   const response = await (await fetch(`http://localhost:4000/architects`)).json();
   return response;
};

export const getArchitectByTier = async (tier: string) => {
   try {
      const response = await (
         await fetch(`http://localhost:4000/architects?tier=${tier}`).then(response => {
            if (!response.ok) {
               throw new Error(`${response.status} 에러가 발생했습니다. `);
            }
            return response;
         })
      ).json();

      return response;
   } catch (e) {
      console.error(e);
   }
};

export const getArchitectByFuzzySearch = async (search: string) => {
   if (!search) return;

   try {
      const response = await (
         await fetch(`http://localhost:4000/architects?search=${search}`).then(response => {
            if (!response.ok) {
               throw new Error(`${response.status} 에러가 발생했습니다. `);
            }
            return response;
         })
      ).json();

      return response;
   } catch (e) {
      console.error(e);
   }
};

export const getArchitectsWithoutPortfolio = async () => {
   const response = await (await fetch(`http://localhost:4000/architects/contentInfo`)).json();
   return response;
};

export const addArchitects = async (body: object) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      const response = await (
         await fetch(`http://localhost:4000/architects`, {
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
