/** fetch한 데이터를 에러, json() 처리하는 함수 */
export const handleFetchData = async (res: Response) => {
   const json = await res.json();
   const httpStatus = res.status;

   if (!res.ok) {
      throw new Error(`${json.error}`);
   }

   return json;
};
