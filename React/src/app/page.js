import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Yeet?</h1>
      <Image className={styles.img} src='/images/senku_icon.jpg' alt="imagem zoada senku" width={400} height={200} />
    </div>
  );
}