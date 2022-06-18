import styles from "../styles/components/Spinner.module.css";

interface Prop {
  spinnerVisibility: string;
}

const Spinner = ({ spinnerVisibility }: Prop) => {
  return (
    <div className={`${spinnerVisibility} ${styles.container}`}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};

export default Spinner;
