import { useState, type ChangeEvent } from 'react';

type TextAreaProps = {
  /**
   * Id for `<textarea>` element
   */
  id: string,
  label: string,
  onInputChange: (value: string) => void;
  error?: string,
  placeholder?: string,
  /**
   * @default 4
   */
  rows?: number,
};

export default function TextArea({ id, label, onInputChange, error, placeholder, rows}: TextAreaProps) {
  const [textValue, setTextValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTextValue(newValue);
    onInputChange(newValue); // Pass the value to the parent component
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={`
          // form-textarea w-full py-2 px-3 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          ${error ? 'border-red-500' : ''}
        `}
        rows={rows ?? 4}
        placeholder={placeholder}
        value={textValue}
        onChange={handleInputChange}
      ></textarea>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
};
