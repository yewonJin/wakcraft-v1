import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useRouter } from 'next/router';

import { Architect } from '@/domain/architect';
import {
   addArchitects,
   getArchitectById,
   getArchitects,
   getArchitectsWithoutPortfolio,
   updateArchitect,
} from './api/architect';
import { toast } from 'react-hot-toast';

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

   const { mutate } = useMutation((body: any) => addArchitects(body), {
      onSuccess: () => {
         toast.success('건축가 추가')
         queryClient.invalidateQueries('architectWithoutPortfolio');
      },
   });

   return { mutate };
};

export const useMutationUpdateArchitect = () => {
   const queryClient = useQueryClient();

   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: any) => updateArchitect(body), {
      onSuccess: () => {
         queryClient.invalidateQueries('architectWithoutPortfolio');
         queryClient.invalidateQueries('architectByfuzzySearch');

      },
   });

   return mutation;
};
