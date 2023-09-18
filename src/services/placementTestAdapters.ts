import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { PlacementTest } from '@/domain/placementTest';
import {
   addPlacementTest,
   getPlacementTestById,
   addPlacementTestApplying,
   getPlacementTestApplying,
} from './api/placementTest';

import { PlacementTestApplyingPayload } from '@/application/create/createTempPlacementTest';
import { PlacementTestApplying } from '@/models/placementTestApplying';

export const useMutationPlacementTest = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: PlacementTest) =>
      toast.promise(addPlacementTest(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useMutationPlacementTestApplying = () => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const mutation = useMutation((body: PlacementTestApplyingPayload[]) =>
      toast.promise(addPlacementTestApplying(body), {
         loading: '추가중',
         success: '추가 완료',
         error: err => err.message,
      }),
   );

   return mutation;
};

export const useQueryPlacementTestApplying = () => {
   const { data: result }: UseQueryResult<PlacementTestApplying[]> = useQuery(
      ['getPlacementTestApplying'],
      () => getPlacementTestApplying(),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};

export const useQueryPlacementTest = () => {
   const router = useRouter();

   const { id } = router.query;

   const { data: result }: UseQueryResult<PlacementTest> = useQuery(
      ['placementTestById', id],
      () => getPlacementTestById(id as string),
      {
         refetchOnWindowFocus: false,
      },
   );

   return result;
};
