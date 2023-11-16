import { type MouseEvent } from 'react';

export type ButtonProps = {
  id: string;
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

export default function Button({id, label, onClick}: ButtonProps) {
  return (
    <button
      id={id}
      type="button"
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
    >
      {label}
    </button>
  );
}
