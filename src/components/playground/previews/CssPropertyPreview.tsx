'use client';
import type React from 'react';
import type { ControlValues } from '@/types/playground';
import styles from './CssPropertyPreview.module.scss';

interface Props {
  subject: string;
  values: ControlValues;
}

const DEMO_ITEMS = ['Item A', 'Item B', 'Item C', 'Item D'];

function getContainerStyle(subject: string, values: ControlValues): React.CSSProperties {
  if (subject === 'flexbox') {
    return {
      display: 'flex',
      flexDirection: String(values.direction) as React.CSSProperties['flexDirection'],
      justifyContent: String(values.justifyContent),
      alignItems: String(values.alignItems),
      flexWrap: String(values.wrap) as React.CSSProperties['flexWrap'],
      gap: `${values.gap}px`,
      width: '100%',
      minHeight: '180px',
    };
  }

  if (subject === 'grid') {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${values.columns}, 1fr)`,
      gridTemplateRows: `repeat(${values.rows}, auto)`,
      gap: `${values.gap}px`,
      gridAutoFlow: String(values.autoFlow) as React.CSSProperties['gridAutoFlow'],
    };
  }

  return {};
}

function getItemStyle(subject: string, values: ControlValues): React.CSSProperties {
  if (subject === 'box-model') {
    return {
      width: '160px',
      minHeight: '60px',
      boxSizing: String(values.boxSizing) as React.CSSProperties['boxSizing'],
      padding: `${values.padding}px`,
      margin: `${values.margin}px`,
      border: `${values.borderWidth}px solid #6366f1`,
      borderRadius: `${values.borderRadius}px`,
    };
  }
  return {};
}

export default function CssPropertyPreview({ subject, values }: Props) {
  const isBoxModel = subject === 'box-model';
  const isTypography = subject === 'typography';
  const containerStyle = getContainerStyle(subject, values);
  const itemStyle = getItemStyle(subject, values);

  if (isTypography) {
    return (
      <div className={styles.canvas}>
        <p
          className={styles.typographyDemo}
          style={{
            fontSize: `${values.fontSize}px`,
            fontWeight: String(values.fontWeight),
            lineHeight: Number(values.lineHeight),
            letterSpacing: `${values.letterSpacing}px`,
            textAlign: String(values.textAlign) as React.CSSProperties['textAlign'],
            textTransform: String(values.textTransform) as React.CSSProperties['textTransform'],
          }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        </p>
      </div>
    );
  }

  if (isBoxModel) {
    return (
      <div className={styles.boxModelCanvas}>
        <div className={styles.boxModelItem} style={itemStyle}>
          Box Model Demo
        </div>
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.container} style={containerStyle}>
        {DEMO_ITEMS.map((label) => (
          <div key={label} className={styles.item}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
