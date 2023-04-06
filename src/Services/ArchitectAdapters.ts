import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useRouter } from 'next/router';

import { Architect } from '@/Domain/architect';
import { addArchitects, getArchitectById, getArchitects, getArchitectsWithoutPortfolio } from './api/architect';

export const useQueryArchitect = () => {
   const { data: result }: UseQueryResult<Architect> = useQuery('architect', getArchitects);

   return result;
};

export const useQueryArchitectById = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<Architect> = useQuery(['architectById', id], () =>
      getArchitectById(id as string),
   );

   return result;
};

export const useQueryArchitectWithoutPortfolio = () => {
   const { data: result }: UseQueryResult<Architect[]> = useQuery(
      'architectWithoutPortfolio',
      getArchitectsWithoutPortfolio,
   );

   return result;
};

export const useMutationArchitect = () => {
   const queryClient = useQueryClient();

   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: any) => addArchitects(body), {
      onSuccess: () => {
         queryClient.invalidateQueries('architectWithoutPortfolio');
      },
   });

   return mutation;
};
