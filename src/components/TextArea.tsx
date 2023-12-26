import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  label: string;
  error?: string;
  fullWidth?: boolean;
  /**
   * Font variant for `<textarea>` element.
   *
   * @default 'sans'
   */
  fontVariant?: 'mono' | 'sans' | 'serif';
  helpText?: string | React.ReactNode;
  /**
   * Id for `<textarea>` element.
   *
   * If not provided, `label` value will be used.
   */
  id?: string;
  onChange: (value: string) => void;
};

export default function TextArea({
  error,
  fullWidth,
  fontVariant = 'sans',
  helpText,
  label,
  ...props
}: TextAreaProps) {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
  };

  const helpTextEl = typeof helpText === 'string' ? <p>{helpText}</p> : helpText;

  return (
    <div className={`block ${props.className ?? ''}`}>
      <label className="inline-block text-gray-700" htmlFor={props.id ?? label}>
        {label}
      </label>
      <textarea
        {...props}
        id={props.id ?? label}
        className={`
          form-textarea py-2 px-3 mt-2 block rounded-md border-gray-300 shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          placeholder-gray-400
          font-${fontVariant}
          ${fullWidth ? 'w-full' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        onChange={handleInputChange}
      />

      <div className={`text-sm mt-1 ml-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
        {error ? <p>{error}</p> : helpTextEl }
      </div>
    </div>
  );
}
