import { Architect } from '@/Domain/architect';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from 'react-query';
import { getArchitectById, getArchitects, getArchitectsWithoutPortfolio } from './api/architect';

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
