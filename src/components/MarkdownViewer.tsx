import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type MarkdownViewerProps = {
  text: string,
  /**
   * View the raw markdown text
   */
  raw?: boolean,
};

export default function MarkdownViewer({text, raw}: MarkdownViewerProps) {
  return (raw ? (
    <pre className='whitespace-pre-wrap break-words'>{text}</pre>
  ) : (
    <Markdown className='prose max-w-none' remarkPlugins={[remarkGfm]}>{text}</Markdown>
  ));
}
