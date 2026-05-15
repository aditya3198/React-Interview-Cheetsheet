import clsx from 'clsx';
import type { Tier, Level } from '@/types/content';
import styles from './Badge.module.scss';

interface BadgeProps {
  label: string;
  variant?: 'version' | 'difficulty' | 'tag' | 'breaking' | 'tier' | 'level';
  tier?: Tier;
  level?: Level;
}

export default function Badge({ label, variant = 'tag', tier, level }: BadgeProps) {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[variant],
        tier && styles[`tier_${tier}`],
        level && styles[`level_${level}`],
      )}
    >
      {variant === 'breaking' && '⚠ '}
      {label}
    </span>
  );
}
