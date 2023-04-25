import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { Architect } from '@/domain/architect';
import {
   addArchitects,
   getArchitectById,
   getArchitects,
   getArchitectsWithoutPortfolio,
   updateArchitect,
} from './api/architect';

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

   const { mutate } = useMutation((body: any) =>
      toast.promise(addArchitects(body), {
         loading: '추가중',
         success: '건축가 추가',
         error: err => err.message,
      }),
   );

   return { mutate };
};

export const useMutationUpdateArchitect = () => {
   const queryClient = useQueryClient();

   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation(
      (body: any) =>
         toast.promise(updateArchitect(body), {
            loading: '수정 중',
            success: '수정 완료',
            error: err => err.message,
         }),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('architectWithoutPortfolio');
            queryClient.invalidateQueries('architectByfuzzySearch');
         },
      },
   );

   return mutation;
};
