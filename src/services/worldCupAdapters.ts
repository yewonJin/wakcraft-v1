import { UseQueryResult, useQuery } from 'react-query';

import { getWorldCup } from './api/worldcup';
import { Worldcup } from '@/domain/worldcup';

export const useQueryWorldCup = () => {
   const { data: result }: UseQueryResult<Worldcup[]> = useQuery(['getWorldCup'], () => getWorldCup(), {
      refetchOnWindowFocus: false,
   });

   return result;
};