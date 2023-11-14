import { useState, type ChangeEvent } from 'react';

type TextAreaProps = {
  /**
   * Id for `<textarea>` element
   */
  id: string,
  label: string,
  placeholder?: string,
  /**
   * @default 4
   */
  rows?: number,
  onInputChange: (value: string) => void;
};

export default function TextArea({id, label, onInputChange, placeholder, rows}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTextValue(newValue);
    onInputChange(newValue); // Pass the value to the parent component
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="textarea">
        {label}
      </label>
      <textarea
        id={id}
        className={`appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 ${isFocused ? 'border-indigo-500' : 'border-gray-300'}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows ?? 4}
        placeholder={placeholder}
        value={textValue}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
};
