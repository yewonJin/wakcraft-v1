import { Button } from '@/components/Common/Button';
import { CommonLayout } from '@/components/Common/CommonLayout';
import TextBox from '@/components/Common/TextBox';
import { useMutationResetWorldcup } from '@/services/worldcupAdapters';

export default function Worldcup() {
   const { mutate } = useMutationResetWorldcup();

   return (
      <CommonLayout>
         <TextBox text="우승 횟수, 참여 횟수 리셋" fontSize="20px" lineHeight="24px" margin="0px 0px 20px 0px"/>
         <Button text="리셋" onClick={() => mutate()} padding="5px 10px" />
      </CommonLayout>
   );
}
