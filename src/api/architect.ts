type ArchitectType = {
   wakzoo_id: string;
   minecraft_id: string;
   tier: string[];
};

export const getArchitectById = async (id: string) => {
   const response = await (await fetch(`http://localhost:4000/architects/${id}`)).json();

   return response;
};

export const getArchitects = async () => {
   const response = await (await fetch(`http://localhost:4000/architects`)).json();
   return response;
};
