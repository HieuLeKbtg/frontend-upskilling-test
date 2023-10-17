import styles from './demo-component.module.css';

/* eslint-disable-next-line */
export interface DemoComponentProps {}

export function DemoComponent(props: DemoComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DemoComponent!</h1>
    </div>
  );
}

export default DemoComponent;
