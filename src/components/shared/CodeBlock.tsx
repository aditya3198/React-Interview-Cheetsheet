'use client';

import { useState, useMemo } from 'react';
import styles from './CodeBlock.module.scss';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  bordered?: boolean;
  showLineNumbers?: boolean;
}

type TokenKind = 'out' | 'comment' | 'string' | 'keyword' | 'number' | 'plain';
interface Token { kind: TokenKind; text: string }

const JS_KW = new Set([
  'const','let','var','function','return','if','else','for','while','do',
  'class','extends','new','this','super','import','export','default','from',
  'async','await','try','catch','finally','throw','typeof','instanceof',
  'in','of','true','false','null','undefined','void','delete','switch',
  'case','break','continue','static','yield','type','interface','enum',
  'implements','readonly','as','declare','satisfies','using','with',
]);

function tokenizeLine(line: string): Token[] {
  if (/^\s*\/\/\s*▸/.test(line)) return [{ kind: 'out', text: line }];

  const tokens: Token[] = [];
  let i = 0;

  const push = (kind: TokenKind, text: string) => {
    const last = tokens[tokens.length - 1];
    if (kind === 'plain' && last?.kind === 'plain') { last.text += text; return; }
    tokens.push({ kind, text });
  };

  while (i < line.length) {
    // Line comment
    if (line[i] === '/' && line[i + 1] === '/') {
      push('comment', line.slice(i)); break;
    }
    // Block comment (single-line portion)
    if (line[i] === '/' && line[i + 1] === '*') {
      const end = line.indexOf('*/', i + 2);
      const text = end === -1 ? line.slice(i) : line.slice(i, end + 2);
      push('comment', text); i += text.length; continue;
    }
    // Strings & template literals
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const q = line[i]; let j = i + 1;
      while (j < line.length && !(line[j] === q && line[j - 1] !== '\\')) j++;
      push('string', line.slice(i, j + 1)); i = j + 1; continue;
    }
    // Numbers
    if (/[0-9]/.test(line[i]) || (line[i] === '.' && /[0-9]/.test(line[i + 1] ?? ''))) {
      let j = i;
      while (j < line.length && /[0-9._xXa-fA-F]/.test(line[j])) j++;
      push('number', line.slice(i, j)); i = j; continue;
    }
    // Identifiers / keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      push(JS_KW.has(word) ? 'keyword' : 'plain', word); i = j; continue;
    }
    push('plain', line[i]); i++;
  }
  return tokens;
}

function OutLine({ text }: { text: string }) {
  const m = text.match(/^(\s*\/\/\s*)(▸\s*)(.*)$/);
  if (!m) return <span className={styles.comment}>{text}</span>;
  return (
    <>
      <span className={styles.comment}>{m[1]}</span>
      <span className={styles.outGlyph}>{m[2]}</span>
      <span className={styles.outValue}>{m[3]}</span>
    </>
  );
}

export default function CodeBlock({
  code,
  language = 'javascript',
  filename,
  bordered = true,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.trim().split('\n'), [code]);

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
        <button onClick={handleCopy} className={styles.copyBtn} aria-label="Copy code" type="button">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre} tabIndex={0}>
        <code>
          {lines.map((line, i) => {
            const tokens = tokenizeLine(line);
            const isOut = tokens[0]?.kind === 'out';
            return (
              <div key={i} className={`${styles.line}${isOut ? ` ${styles.lineOut}` : ''}`}>
                {showLineNumbers && (
                  <span className={styles.lineNum} aria-hidden="true">{i + 1}</span>
                )}
                {isOut
                  ? <OutLine text={tokens[0].text} />
                  : tokens.map((t, j) => (
                      <span key={j} className={styles[t.kind as string]}>{t.text}</span>
                    ))
                }
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
