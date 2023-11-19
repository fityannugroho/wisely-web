import type { InputHTMLAttributes } from 'react';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  label: string;
  error?: string;
  fullWidth?: boolean;
  helpText?: string | React.ReactNode;
  onChange?: (value: string) => void;
};

export default function Input({
  label,
  error,
  fullWidth,
  helpText,
  ...props
}: InputProps) {
  return (
    <label className={`block text-gray-700 ${props.className ?? ''}`}>
      {label}

      <input
        {...props}
        className={`
          mt-1 block rounded-md border-gray-300 shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          placeholder-gray-400
          ${fullWidth ? 'w-full' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />

      <div className={`text-sm mt-1 ml-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
        {error ? <p>{error}</p> : (
          typeof helpText === 'string' ? <p>{helpText}</p> : helpText
        )}
      </div>
    </label>
  );
}
