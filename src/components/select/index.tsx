import { ChangeEvent } from "react";

interface OptionsProps {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: OptionsProps[];
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  options,
  value,
  className,
  onChange,
}: SelectProps) {
  return (
    <div className="mt-5 mb-2">
      <label className="block mb-2 text-base font-bold text-black">
        {label}
      </label>
      <select
        name="select"
        id="select"
        className={className}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
