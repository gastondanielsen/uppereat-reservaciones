interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text: string;
  disabled?: boolean;
}

export default function Button({ type, text, disabled }: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        className={`w-full px-4 py-2 text-white font-bold
          bg-indigo-600 rounded-md
          hover:bg-indigo-700 focus:outline-none
          focus:bg-indigo-700 ${disabled && "cursor-not-allowed opacity-50"}`}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
