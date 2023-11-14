import { useEffect, useState } from 'react';
import Button from './Button';
import TextArea from './TextArea';

export default function Playground() {
  const [input, setInput] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [result, setResult] = useState('The result will be here...');

  useEffect(() => {
    if (fetching) {
      fetch(`/api/wisely?q=${input}`)
        .then(res => res.json())
        .then(data => {
          setResult(data.text);
        })
        .catch(err => {
          console.error(err);
        })
    }

    return () => {
      setFetching(false);
    }
  }, [fetching])

  return (
    <>
      <TextArea
        id="textInput"
        label='Enter the text'
        placeholder='Lorem ipsun dolor sit amet'
        onInputChange={(val) => setInput(val)}
      />

      <Button
        id="btnSubmit"
        label='Submit'
        onClick={() => setFetching(!fetching)}
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
