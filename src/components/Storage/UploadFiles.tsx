import { useUpload } from '@/application/uploadFiles';
import InputBox from '@/components/Common/InputBox';
import { ContentType } from './AwsStorage';

export default function UploadFiles({ content, page }: { content: ContentType; page: number }) {
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
