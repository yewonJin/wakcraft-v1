import { ContentType } from '@/components/Storage/AwsStorage';

export const getAwsDirectory = async (content: ContentType) => {
   try {
      return await fetch(`/api/aws/object?content=${content}`).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const getAwsImages = async (content: ContentType, page: number) => {
   try {
      return await fetch(`/api/aws/image?content=${content}&episode=${page}`).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const postAwsDirectory = async (content: ContentType, episode: number) => {
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

export const patchAwsPlacementTestImages = async (beforeId: string, afterId: string) => {
   try {
      return await fetch(`/api/aws/rename?beforeId=${beforeId}&afterId=${afterId}`, {
         method: 'PATCH',
      });
   } catch (e) {
      console.error(e);
   }
};
