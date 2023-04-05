export const getArchitectById = async (id: string) => {
   const response = await (await fetch(`http://localhost:4000/architects/${id}`)).json();

   return response;
};

export const getArchitects = async () => {
   const response = await (await fetch(`http://localhost:4000/architects`)).json();
   return response;
};

export const getArchitectsWithoutPortfolio = async () => {
   const response = await (await fetch(`http://localhost:4000/architects/contentInfo`)).json();
   return response;
};
