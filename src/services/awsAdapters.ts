import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';

import { getAwsDirectory, getAwsImages, postAwsDirectory, postAwsImages } from './api/aws';
import { Content } from '@/domain/aws';

export const useQueryAwsDirectory = (content: Content) => {
   const { data }: UseQueryResult<string[]> = useQuery('getAwsDirectory', () => getAwsDirectory(content), {
      refetchOnWindowFocus: false,
   });

   return { data };
};

export const useQueryAwsImages = (content: Content, page: number) => {
   const { data }: UseQueryResult<string[]> = useQuery(
      ['getAwsImages', content, page],
      () => getAwsImages(content, page),
      {
         refetchOnWindowFocus: false,
         suspense: true,
      },
   );

   return { data };
};

export const useMutationNewFolder = (content: Content, episode: number) => {
   const queryClient = useQueryClient();

   const mutation = useMutation(() => postAwsDirectory(content, episode), {
      onSuccess: () => {
         queryClient.invalidateQueries('getAwsDirectory');
      },
   });

   return mutation;
};

export const useMutationUploadFiles = (page: number) => {
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ formData }: { formData: FormData }) =>
         toast.promise(postAwsImages(formData), {
            loading: '추가 중',
            success: '추가 완료',
            error: err => err.message,
         }),
      {
         onSuccess: () => {
            setInterval(() => {
               queryClient.invalidateQueries(['getAwsImages', page]);
            }, 1000);
         },
      },
   );

   return mutation;
};