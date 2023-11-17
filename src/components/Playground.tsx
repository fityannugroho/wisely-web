import { useEffect, useReducer, useState } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';
import TextArea from './TextArea';

function charsetsReducer(
  charsets: readonly string[],
  action: { type: 'add' | 'remove', charset: string },
) {
  switch (action.type) {
    case 'add':
      return charsets.includes(action.charset) ? charsets : [...charsets, action.charset];
    case 'remove':
      return charsets.filter(charset => charset !== action.charset);
    default:
      throw new Error();
  }
}

const charsetNames = ['latin', 'latin-1'] as const;

export default function Playground() {
  const [input, setInput] = useState<string>('');
  const [charsets, dispatchCharsets] = useReducer(charsetsReducer, ['latin']);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [result, setResult] = useState('The result will be here...');
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (fetching) {
      const url = new URL('/api/wisely', window.location.origin);

      url.searchParams.set('q', input);
      charsets.forEach(charset => {
        url.searchParams.append('charSet', charset);
      });
      if (caseSensitive) {
        url.searchParams.set('caseSensitive', '');
      }

      fetch(url, { mode: 'cors' })
        .then(res => res.json())
        .then(data => {
          data.error ? setError(data.message) : setResult(data.text);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setFetching(false);
        });
    }

    return () => {
      setFetching(false);
      setError(undefined);
    }
  }, [fetching]);

  useEffect(() => {
    if (charsets.length === 0) {
      dispatchCharsets({ type: 'add', charset: 'latin' });
    }
  }, [charsets]);

  return (
    <>
      <TextArea
        id="textInput"
        label='Enter the text'
        placeholder='Lorem ipsun dolor sit amet'
        onInputChange={(val) => setInput(val)}
        error={error}
      />

      <p className="text-gray-700 mt-3 mb-2">Case</p>
      <CheckBox
        label='case-sensitive'
        onChange={(checked) => setCaseSensitive(checked)}
      />

      <p className="text-gray-700 mt-3 mb-2">Charsets</p>
      <div className="block">
        <div className="inline-flex flex-col space-y-2 mb-4">
          {charsetNames.map((name) => (
            <CheckBox
              key={name}
              label={`${name}${name === 'latin' ? ' (default)' : ''}`}
              onChange={(checked) => {
                dispatchCharsets({ type: checked ? 'add' : 'remove', charset: name });
              }}
              checked={charsets.includes(name)}
              disabled={name === 'latin' && charsets.length === 1 && charsets[0] === 'latin'}
            />
          ))}
        </div>
      </div>

      <Button
        id="btnSubmit"
        label={fetching ? 'Fetching...' : 'Start'}
        onClick={() => setFetching(!fetching)}
        disabled={fetching}
      />

      <hr className="my-4" />

      <p
        id="result"
        className="text-mono"
      >
        {result || error}
      </p>
    </>
  )
}
