'use client';
import { Component, useState, useEffect, type ReactNode } from 'react';
import type { ControlValues } from '@/types/playground';
import styles from './ReactComponentPreview.module.scss';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; message: string }> {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error} role="alert">
          <strong>Preview error</strong>
          <span>{this.state.message}</span>
        </div>
      );
    }
    return this.props.children;
  }
}

interface Props {
  factory: ((values: ControlValues) => ReactNode) | undefined;
  values: ControlValues;
}

export default function ReactComponentPreview({ factory, values }: Props) {
  if (!factory) {
    return (
      <div className={styles.canvas}>
        <p className={styles.noPreview}>No preview available</p>
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <ErrorBoundary key={JSON.stringify(values)}>
        {factory(values)}
      </ErrorBoundary>
    </div>
  );
}
