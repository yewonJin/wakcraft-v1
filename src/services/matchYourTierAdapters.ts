import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { MatchYourTier } from '@/domain/matchYourTier';
import { addMatchYourTier, getMatchYourTierById } from './api/matchYourTier';

export const useMutationMatchYourTier = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: MatchYourTier) =>
      toast.promise(addMatchYourTier(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryMatchYourTier = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<MatchYourTier> = useQuery(
      ['matchYourTierById', id],
      () => getMatchYourTierById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
