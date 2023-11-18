import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
}

export default function Button({
  label,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        text-white font-bold py-2 px-4 rounded
        focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-100
        ${props.disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
        ${props.className ?? ''}
      `}
    >
      {label}
    </button>
  );
}
