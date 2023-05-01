import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import {
   getNoobProHackerDirectory,
   getNoobProHackerImages,
   postNoobProHackerDirectory,
   postNoobProHackerImages,
} from './api/aws';
import { toast } from 'react-hot-toast';

export const useQueryNoobProHackerDirectory = () => {
   const { data }: UseQueryResult<string[]> = useQuery('getNoobProHackerDirectory', () => getNoobProHackerDirectory(), {
      refetchOnWindowFocus: false,
   });

   return { data };
};

export const useQueryNoobProHackerImages = (page: number) => {
   const { data }: UseQueryResult<string[]> = useQuery(
      ['getNoobProHackerImages', page],
      () => getNoobProHackerImages(page),
      {
         refetchOnWindowFocus: false,
         suspense: true,
      },
   );

   return { data };
};

export const useMutationNewFolder = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation((episode: number) => postNoobProHackerDirectory(episode), {
      onSuccess: () => {
         queryClient.invalidateQueries('getNoobProHackerDirectory');
      },
   });

   return mutation;
};

export const useMutationUploadFiles = (page: number) => {
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ episode, formData }: { episode: string; formData: FormData }) =>
         toast.promise(postNoobProHackerImages(formData, episode), {
            loading: '추가 중',
            success: '추가 완료',
            error: err => err.message,
         }),
      {
         onSuccess: () => {
            setInterval(() => {
               queryClient.invalidateQueries(['getNoobProHackerImages', page]);
            }, 1000);
         },
      },
   );

   return mutation;
};
