import { useUpdateArchitect } from '@/application/updateArchitect';
import { useUpload } from '@/application/uploadFiles';
import InputBox from '@/components/Common/InputBox';

export default function UploadFiles({ page }: { page: number }) {
   const { handleFileChange } = useUpload(page);

   return (
      <InputBox
         type="file"
         accept="image/*"
         onChange={e => handleFileChange(e, page.toString())}
         name="image_url"
         width="250px"
         multiple
      />
   );
}
