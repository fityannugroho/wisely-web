import { type MouseEvent } from 'react';

export type ButtonProps = {
  id: string;
  disabled?: boolean;
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export default function Button({ id, disabled, label, onClick}: ButtonProps) {
  return (
    <button
      id={id}
      type="button"
      className={`
        text-white font-bold py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700
        focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-100
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
