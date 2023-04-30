import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import {
   getNoobProHackerDirectory,
   getNoobProHackerImages,
   postNoobProHackerDirectory,
   postNoobProHackerImages,
} from './api/aws';

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

export const useMutationUploadFiles = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ episode, formData }: { episode: string; formData: FormData }) => postNoobProHackerImages(formData, episode),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('getNoobProHackerDirectory');
         },
      },
   );

   return mutation;
};
