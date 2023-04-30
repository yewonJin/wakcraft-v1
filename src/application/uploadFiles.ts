import { useMutationUploadFiles } from '@/services/awsAdapters';
import { toast } from 'react-hot-toast';

export const useUpload = () => {
   const mutation = useMutationUploadFiles();

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, episode: string) => {
      e.preventDefault();

      if (!e.target.files) {
         toast.error('파일을 제대로 첨부해주세요');
         return;
      }

      const formData = new FormData();
      formData.append('episode', episode);

      for (let i = 0; i < e.target.files.length; i++) {
         formData.append(`file${i}`, e.target.files[i]);
      }

      mutation.mutate({ episode: episode, formData: formData });
   };

   return { handleFileChange };
};
