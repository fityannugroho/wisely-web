import { useState } from 'react';
import Button from './Button';
import TextArea from './TextArea';

export default function Playground() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState('The result will be here...');

  return (
    <>
      <TextArea
        id="textInput"
        label='Enter the text'
        placeholder='Lorem ipsun dolor sit amet'
        onInputChange={(val) => {
          setInput(val);
        }}
      />

      <Button
        id="btnSubmit"
        label='Submit'
        onClick={(e) => {
          setResult(input);
        }}
      />

      <hr className="my-4" />

      <p
        id="result"
        className="text-mono"
      >
        {result}
      </p>
    </>
  )
}
