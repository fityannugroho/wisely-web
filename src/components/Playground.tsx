import { useEffect, useMemo, useReducer, useState } from 'react';
import { CharSets, isCharSetValid, type CharSet } from 'wisely/core';
import Button from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
import MarkdownViewer from './MarkdownViewer';
import TextArea from './TextArea';

function charSetsReducer(
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

type Payload = {
  text?: string;
  caseSensitive?: boolean | undefined;
  customCharSet?: string | undefined;
  phrases?: string[] | undefined;
}

export default function Playground(props: PlaygroundProps) {
  const [data, setData] = useState<Payload>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Payload, string[]>>>({});
  const [charSets, dispatchCharSets] = useReducer(charSetsReducer, ['latin']);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState('');
  const [mdMode, setMdMode] = useState<boolean>(false);

  const changeErrors = <K extends keyof Payload>(
    key: K,
    value: string[] | ((oldValue: string[]) => string[]),
  ) => {
    setErrors((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key] ?? []) : value,
    }));
  }

  const changeData = <K extends keyof Payload>(
    key: K,
    value: Payload[K] | ((oldValue: Payload[K]) => Payload[K]),
  ) => {
    changeErrors(key, []);
    setData((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  }

  useEffect(() => {
    if (loading) {
      setErrors({});

      fetch('/api/wisely', {
        method: 'post',
        body: JSON.stringify({
          ...data,
          charSets: charSets.filter((charset) => charset !== 'custom'),
        }),
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((resJson) => {
          resJson?.status < 400
            ? setResult(resJson.text)
            : setErrors(resJson?.message);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const hasErrors = useMemo(() => (
    Object.values(errors)
      .reduce((prev, curr) => [...prev, ...curr], [])
      .length > 0
  ), [errors]);

  useEffect(() => {
    if (!charSets.length) {
      dispatchCharSets({ type: 'add', charset: 'latin' });
    }
  }, [charSets]);

  return (
    <div className={props.className}>
      <TextArea
        className='mb-4'
        fullWidth
        label='Enter the text'
        placeholder='You can put plain text or Markdown syntax here'
        onChange={(text) => changeData('text', text)}
        error={errors.text?.at(0)}
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
        error={errors.phrases?.at(0)}
        onChange={(val) => changeData('phrases', Array.from(new Set(
          val.split(',').map((phrase) => phrase.trim())
            .filter((phrase) => phrase.length > 0)
        )))}
      />

      <details>
        <summary className='mb-2'>Settings</summary>
        <div className='pb-2 flex flex-row flex-wrap gap-x-12 gap-y-4'>
          <div className="block">
            <p className="text-gray-700 mb-2">Case</p>
            <CheckBox
              label='case-sensitive'
              onChange={(checked) => changeData('caseSensitive', checked)}
            />
          </div>

          <div className="block">
            <p className="text-gray-700 mb-2">Charsets</p>
            <div className="inline-flex flex-col space-y-2">
              {[...Object.values(CharSets), 'custom'].map((name) => (
                <CheckBox
                  key={name}
                  label={`${name}${name === 'latin' ? ' (default)' : ''}`}
                  onChange={(checked) => dispatchCharSets({
                    type: checked ? 'add' : 'remove',
                    charset: name,
                  })}
                  checked={charSets.includes(name)}
                  disabled={name === 'latin' && charSets.length === 1 && charSets[0] === 'latin'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Custom charset */}
        {charSets.includes('custom') && (
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
            onChange={(customCharSet) => {
              if (customCharSet) {
                try {
                  if (!isCharSetValid(JSON.parse(customCharSet))) {
                    changeErrors('customCharSet', ['Invalid charset value']);
                    return;
                  }
                } catch (err) {
                  changeErrors('customCharSet', ['Invalid JSON format']);
                  return;
                }
              }
              changeData('customCharSet', customCharSet);
            }}
            rows={4}
            error={errors.customCharSet?.at(0)}
          />
        )}
      </details>

      <Button
        className='mt-3 w-full md:w-auto'
        label={loading ? 'Obfuscating...' : 'Obfuscate'}
        onClick={() => setLoading(!loading)}
        disabled={loading || hasErrors}
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
