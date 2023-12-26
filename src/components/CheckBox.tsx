import type { InputHTMLAttributes } from 'react';

export type CheckBoxProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'onChange' | 'type' | 'value'
> & {
  label: string;
  onChange?: (checked: boolean) => void;
};

export default function CheckBox({
  label,
  ...props
}: CheckBoxProps) {
  const handleChange = (checked: boolean) => {
    props.onChange?.(checked);
  };

  return (
    <label
      className={`
        inline-flex items-center shrink
        ${props.disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}
        ${props.className ?? ''}
      `}
      htmlFor={props.id ?? label}
    >
      <input
        {...props}
        id={props.id ?? label}
        className={`
          form-checkbox rounded border-gray-300 text-indigo-600 shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50
          ${props.disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}
        `}
        type="checkbox"
        onChange={(e) => { handleChange(e.target.checked); }}
      />
      <span className='ml-2'>
        {label}
      </span>
    </label>
  );
}
