import { ReactNode, useState } from "react";

interface RoundInputProps {
  label: string;
  name: string;
  type: string;
  icon: ReactNode;
}

const RoundInput = ({ label, name, type, icon }: RoundInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <label onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} 
      htmlFor={name} className="w-full rounded-2xl p-1.5 bg-blue-50">
      <div className={`w-full ${isFocused ? 'bg-white ring-2 ring-blue-400' : 'bg-blue-50'} flex items-center rounded-2xl px-4 py-2 gap-4`}>
        <div className="flex flex-col flex-grow">
          <p className={`${isFocused ? 'text-sky-500' : 'text-slate-400'} text-xs font-semibold`}>
            {label}
          </p>
          <input className="peer box-border rounded bg-transparent text-black focus:outline-none" id={name} name={name} type={type} />
        </div>
        {icon}
      </div>
    </label>
  )
};

export default RoundInput;
