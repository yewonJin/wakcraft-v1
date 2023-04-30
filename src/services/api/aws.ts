export const getNoobProHackerDirectory = async () => {
   try {
      return await fetch('/api/aws/object').then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const getNoobProHackerImages = async (page: number) => {
   try {
      return await fetch(`/api/aws/image?episode=${page}`).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const postNoobProHackerDirectory = async (episode: number) => {
   try {
      return await fetch(`/api/aws/object?episode=${episode}`, {
         method: 'POST',
      }).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};

export const postNoobProHackerImages = async (formData: FormData, episode: string) => {
   try {
      return await fetch(`/api/aws/image?episode=${episode}`, {
         method: 'POST',
         body: formData,
      }).then(res => res.json());
   } catch (e) {
      console.error(e);
   }
};
