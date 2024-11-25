import { ChangeEvent } from "react";

interface InputProps {
  id?: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block mb-2 text-base font-bold text-black">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border text-black
          border-gray-300 rounded-md
          focus:outline-none focus:ring-2
          focus:ring-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
}
