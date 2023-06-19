import { ArchitectureContest } from '@/domain/architectureContest';
import { handleFetchData } from '@/utils/handleFetchData';

export const addArchitectureContest = async (body: ArchitectureContest) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/architectureContest`, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const editArchitectureContest = async (body: ArchitectureContest) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   try {
      return await fetch(`/api/architectureContest`, {
         method: 'PUT',
         body: JSON.stringify(body),
         headers: myHeaders,
      }).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const getArchitectureContestByEpisode = async (id: string) => {
   try {
      return await fetch(`/api/architectureContest?episode=${id}`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};

export const getArchitectureContestWithoutLine = async () => {
   try {
      return await fetch(`/api/architectureContest`).then(handleFetchData);
   } catch (error) {
      throw error;
   }
};
