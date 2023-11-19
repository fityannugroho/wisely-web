import { useEffect, useReducer, useState } from 'react';
import { CharSets, isCharSetValid } from 'wisely/core';
import Button from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
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

export default function Playground(props: PlaygroundProps) {
  const [input, setInput] = useState<string>('');
  const [charsets, dispatchCharsets] = useReducer(charsetsReducer, ['latin']);
  const [customCharset, setCustomCharset] = useState<string>('');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [mdMode, setMdMode] = useState<boolean>(false);
  const [phrases, setPhrases] = useState<string[]>([]);

  useEffect(() => {
    if (loading) {
      setError(undefined);

      const url = new URL('/api/wisely', window.location.origin);

      url.searchParams.set('t', input);
      url.searchParams.set('p', phrases.join(','));

      charsets.forEach(charset => {
        if (charset === 'custom') {
          // remove all whitespaces
          const custom = customCharset.replace(/\s/g, '');
          if (custom) {
            url.searchParams.append('custom', custom);
          }
          return;
        }
        url.searchParams.append('charset', charset);
      });

      if (caseSensitive) {
        url.searchParams.set('sensitive', '');
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
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (charsets.length === 0) {
      dispatchCharsets({ type: 'add', charset: 'latin' });
    }
  }, [charsets]);

  return (
    <div className={props.className}>
      <TextArea
        className='mb-4'
        fullWidth
        label='Enter the text'
        placeholder='You can put plain text or Markdown syntax here'
        onChange={(val) => setInput(val)}
        value={input}
        error={error}
        rows={4}
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

      <Input
        className='mb-4'
        fullWidth
        label='Phrases (optional)'
        helpText='Enter specific phrases to obsfucate, separated by comma.'
        placeholder='e.g. lorem, ipsum, dolor sit, amet'
        onChange={(val) => setPhrases(
          Array.from(new Set(
            val.split(',').map(phrase => phrase.trim())
          ))
        )}
      />

      <details>
        <summary className='mb-2'>Settings</summary>
        <div className='pb-2 flex flex-row flex-wrap gap-x-12 gap-y-4'>
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
              {Object.values(CharSets).map((name) => (
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
              <CheckBox
                label='custom'
                onChange={(checked) => {
                  dispatchCharsets({ type: checked ? 'add' : 'remove', charset: 'custom' });
                  // reset custom charset
                  if (!checked) {
                    setCustomCharset('');
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Custom charset */}
        {charsets.includes('custom') && (
          <TextArea
            className='mt-2 mb-4'
            fullWidth
            fontVariant='mono'
            label='Custom charset'
            helpText={
              <p>
                Enter custom charset in <b>JSON</b> format. It also must be a <a
                  href="https://github.com/fityannugroho/wisely#charsets"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >valid charset</a>.
              </p>
            }
            placeholder='e.g. { "a": ["4","@"], "e": ["3"], "i": ["1"] }'
            onChange={(val) => setCustomCharset(val)}
            value={customCharset}
            rows={4}
            error={(() => {
              if (customCharset) {
                try {
                  if (!isCharSetValid(JSON.parse(customCharset))) {
                    return 'Invalid charset provided';
                  }
                } catch (err) {
                  return 'Invalid JSON format';
                }
              }
              if (charsets.length === 1 && charsets[0] === 'custom' && !customCharset) {
                return 'Custom charset must be provided';
              }
              return undefined;
            })()}
          />
        )}
      </details>

      <Button
        className='mt-3 w-full md:w-auto'
        label={loading ? 'Obfuscating...' : 'Obfuscate'}
        onClick={() => setLoading(!loading)}
        disabled={loading}
      />

      {/* Render result */}
      {result.length > 0 && (
        <div className='mt-6'>
          {/* Markdown mode toggle */}
          <div className="flex justify-end mb-2">
            <CheckBox
              label='Render as Markdown'
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
