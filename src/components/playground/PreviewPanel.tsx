'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PlaygroundConfig, ControlValues } from '@/types/playground';
import { deriveHtmlCode, deriveCssCode, deriveReactCode } from '@/utils/deriveCode';
import CodeBlock from '@/components/shared/CodeBlock';
import HtmlElementPreview from './previews/HtmlElementPreview';
import CssPropertyPreview from './previews/CssPropertyPreview';
import ReactComponentPreview from './previews/ReactComponentPreview';
import styles from './PreviewPanel.module.scss';

interface Props {
  config: PlaygroundConfig;
  values: ControlValues;
}

function getCode(config: PlaygroundConfig, values: ControlValues): { code: string; language: 'html' | 'css' | 'jsx' } {
  switch (config.previewType) {
    case 'html-element':
      return { code: deriveHtmlCode(config.subject, values), language: 'html' };
    case 'css-property':
      return { code: deriveCssCode(config.subject, values), language: 'css' };
    case 'react-component':
      return { code: deriveReactCode(config.subject, values), language: 'jsx' };
  }
}

export default function PreviewPanel({ config, values }: Props) {
  const [showCode, setShowCode] = useState(false);
  const { code, language } = getCode(config, values);

  return (
    <div className={styles.panel}>
      <div className={styles.preview}>
        {config.previewType === 'html-element' && (
          <HtmlElementPreview subject={config.subject} values={values} />
        )}
        {config.previewType === 'css-property' && (
          <CssPropertyPreview subject={config.subject} values={values} />
        )}
        {config.previewType === 'react-component' && (
          <ReactComponentPreview factory={config.componentFactory} values={values} />
        )}
      </div>

      <div className={styles.codeToggleBar}>
        <button
          className={styles.codeToggle}
          onClick={() => setShowCode((s) => !s)}
          aria-expanded={showCode}
        >
          {showCode ? 'Hide Code' : 'Show Code'}
          <span className={`${styles.chevron} ${showCode ? styles.chevronUp : ''}`}>›</span>
        </button>
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            className={styles.codeSection}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <CodeBlock code={code} language={language} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
