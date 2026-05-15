'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Language } from '@/types/content';
import styles from './CodeBlock.module.scss';

interface CodeBlockProps {
  code: string;
  language?: Language | string;
  filename?: string;
  showLineNumbers?: boolean;
  bordered?: boolean;
}

export default function CodeBlock({ code, language = 'javascript', filename, showLineNumbers = false, bordered = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.wrapper}${bordered ? '' : ` ${styles.borderless}`}`}>
      <div className={styles.header}>
        {filename && <span className={styles.filename}>{filename}</span>}
        <span className={styles.lang}>{language}</span>
        <button onClick={handleCopy} className={styles.copyBtn} aria-label="Copy code">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: '#1e1a2e',
          fontSize: '0.875rem',
          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          overflowX: 'auto',
        }}
        codeTagProps={{ style: { fontFamily: "'Fira Code', 'Cascadia Code', monospace" } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
