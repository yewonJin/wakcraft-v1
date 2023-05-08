import { useMutation } from 'react-query';

import { toast } from 'react-hot-toast';
import { PlacementTest } from '@/domain/placementTest';
import { addPlacementTest } from './api/placementTest';

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
