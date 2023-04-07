import { NoobProHacker } from "@/domain/noobProHacker";
import { useMutation, useQueryClient } from "react-query"
import { addNoobProHacker } from "./api/noobProHacker";

export const useMutationNoobProHacker = () => {
    const queryClient = useQueryClient();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
 
    const mutation = useMutation((body: NoobProHacker) => addNoobProHacker(body), {
       onSuccess: (data) => {
          console.log(data);
       },
    });
 
    return mutation;
}