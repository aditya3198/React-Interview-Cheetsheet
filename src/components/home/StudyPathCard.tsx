import Link from 'next/link';
import styles from './StudyPathCard.module.scss';

interface StudyPathCardProps {
  tag: string;
  name: string;
  description: string;
  time: string;
  href: string;
}

export default function StudyPathCard({ tag, name, description, time, href }: StudyPathCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.tag}>{tag}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.desc}>{description}</p>
      <div className={styles.meta}>
        <span className={styles.time}>{time}</span>
        <span className={styles.start}>Start →</span>
      </div>
    </Link>
  );
}
