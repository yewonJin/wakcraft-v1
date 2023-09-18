import { useUpload } from '@/application/aws/uploadFiles';
import InputBox from '@/components/Common/InputBox';
import { Content } from '@/domain/aws';

export default function UploadFiles({ content, page }: { content: Content; page: number }) {
   const { handleFileChange } = useUpload(page);

   return (
      <InputBox
         type="file"
         accept="image/*"
         onChange={e => handleFileChange(e, page.toString(), content)}
         name="image_url"
         width="250px"
         multiple
      />
   );
}
