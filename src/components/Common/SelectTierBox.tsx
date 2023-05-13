import { createTierArray } from '@/domain/architect';
import { ChangeEvent } from 'react';

type Props = {
   name: string;
   value: string;
   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectTierBox(props: Props) {
   const { name, value, onChange } = props;

   return (
      <select name={name} value={value} onChange={onChange}>
         {createTierArray().map(tier => {
            return (
               <option key={tier} value={tier}>
                  {tier}
               </option>
            );
         })}
      </select>
   );
}
