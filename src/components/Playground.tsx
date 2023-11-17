import { useEffect, useReducer, useState } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';
import MarkdownViewer from './MarkdownViewer';
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

export type PlaygroundProps = {
  className?: string;
}

const charsetNames = ['latin', 'latin-1'] as const;

export default function Playground(props: PlaygroundProps) {
  const [input, setInput] = useState<string>('');
  const [charsets, dispatchCharsets] = useReducer(charsetsReducer, ['latin']);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [mdMode, setMdMode] = useState<boolean>(false);

  useEffect(() => {
    if (fetching) {
      setError(undefined);

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
  }, [fetching]);

  useEffect(() => {
    if (charsets.length === 0) {
      dispatchCharsets({ type: 'add', charset: 'latin' });
    }
  }, [charsets]);

  return (
    <div className={props.className}>
      <TextArea
        id="textInput"
        label='Enter the text'
        placeholder='Lorem ipsun dolor sit amet'
        onInputChange={(val) => setInput(val)}
        error={error}
        helpText={
          <p>
            Can be plain text or <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >Markdown syntax</a>.
          </p>
        }
      />

      <details>
        <summary className='mb-2'>Settings</summary>
        <div className='pb-4 flex flex-row flex-wrap gap-x-12 gap-y-4'>
          <div className="block">
            <p className="text-gray-700 mb-2">Case</p>
            <CheckBox
              label='case-sensitive'
              onChange={(checked) => setCaseSensitive(checked)}
            />
          </div>

          <div className="block">
            <p className="text-gray-700 mb-2">Charsets</p>
            <div className="inline-flex flex-col space-y-2">
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
        </div>
      </details>

      <Button
        id="btnSubmit"
        label={fetching ? 'Fetching...' : 'Start'}
        onClick={() => setFetching(!fetching)}
        disabled={fetching}
        className='mt-3 w-full md:w-auto'
      />

      {/* Render result */}
      {result.length > 0 && (
        <div className='mt-6'>
          {/* Markdown mode toggle */}
          <div className="flex justify-end mb-2">
            <CheckBox
              label='Render as markdown'
              onChange={(checked) => setMdMode(checked)}
            />
          </div>
          <div className="block border border-gray-300 rounded-md p-4">
            <MarkdownViewer text={result} raw={!mdMode} />
          </div>
        </div>
      )}
    </div>
  )
}
