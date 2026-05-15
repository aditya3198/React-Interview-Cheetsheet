'use client';
import { useMemo } from 'react';
import { deriveHtmlCode } from '@/utils/deriveCode';
import type { ControlValues } from '@/types/playground';
import styles from './HtmlElementPreview.module.scss';

interface Props {
  subject: string;
  values: ControlValues;
}

export default function HtmlElementPreview({ subject, values }: Props) {
  const html = useMemo(() => {
    const elementHtml = deriveHtmlCode(subject, values);
    const body = subject === 'input'
      ? `<form onsubmit="event.preventDefault();document.getElementById('_ok').style.display='block'">
  ${elementHtml}
  <button type="submit" style="margin-top:0.5rem;display:block">Submit</button>
  <p id="_ok" style="color:green;margin:0.5rem 0 0;display:none">✓ Submitted</p>
</form>`
      : elementHtml;
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
</head>
<body style="margin:2rem;font-family:system-ui,sans-serif;">${body}</body>
</html>`;
  }, [subject, values]);

  return (
    <iframe
      className={styles.iframe}
      srcDoc={html}
      sandbox="allow-scripts allow-forms"
      title="HTML element preview"
    />
  );
}
