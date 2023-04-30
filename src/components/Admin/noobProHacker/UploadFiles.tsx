import { useUpdateArchitect } from '@/application/updateArchitect';
import { useUpload } from '@/application/uploadFiles';
import InputBox from '@/components/Common/InputBox';

export default function UploadFiles({ episode }: { episode: string }) {
   const { handleFileChange } = useUpload();

   return (
      <InputBox
         type="file"
         accept="image/*"
         onChange={e => handleFileChange(e, episode)}
         name="image_url"
         width="250px"
         multiple
      />
   );
}
