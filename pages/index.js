import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
                valt.
            </span>
          </h1>
        </div>
      </div>
    </main>
  );
}
