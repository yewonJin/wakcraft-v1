import { Content } from '@/domain/aws';

export const getAwsDirectory = async (content: Content) => {
   try {
      return await fetch(`/api/aws/object?content=${content}`).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const getAwsImages = async (content: Content, page: number) => {
   try {
      return await fetch(`/api/aws/image?content=${content}&episode=${page}`).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const postAwsDirectory = async (content: Content, episode: number) => {
   try {
      return await fetch(`/api/aws/object?content=${content}&episode=${episode}`, {
         method: 'POST',
      }).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const postAwsImages = async (formData: FormData) => {
   try {
      return await fetch(`/api/aws/image`, {
         method: 'POST',
         body: formData,
      }).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};