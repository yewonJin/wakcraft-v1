import { toast } from 'react-hot-toast';

import { useMutationUploadFiles } from '@/services/awsAdapters';

export const useUpload = (page: number) => {
   const mutation = useMutationUploadFiles(page);

   const handleFileChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
      episode: string,
      content: 'noobProHacker' | 'placementTest' | 'eventNoobProHacker' | 'architectureContest' | 'matchYourTier',
   ) => {
      if (!e.target.files) {
         toast.error('파일을 제대로 첨부해주세요');
         return;
      }

      const formData = new FormData();
      formData.append('episode', episode);
      formData.append('content', content);

      for (let i = 0; i < e.target.files.length; i++) {
         formData.append(`file${i}`, e.target.files[i]);
      }

      mutation.mutate({ formData: formData });
   };

   return { handleFileChange };
};
