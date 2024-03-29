import styles from "../styles/Home.module.css";
import Image from "next/image";

import { ConnectButton } from '@rainbow-me/rainbowkit';

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
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}
