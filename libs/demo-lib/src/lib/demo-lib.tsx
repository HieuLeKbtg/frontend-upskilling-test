import styles from './demo-lib.module.css';

/* eslint-disable-next-line */
export interface DemoLibProps {}

export function DemoLib(props: DemoLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DemoLib!</h1>
    </div>
  );
}

export default DemoLib;
