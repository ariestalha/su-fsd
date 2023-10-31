import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getData } from "./api/files";

export default function Home(props) {
  const { list = [] } = props;
  const [sortBy, setSortBy] = useState("a");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortList = (arr) => {
    if (sortBy === "a") {
      return arr.sort((a, b) =>
        a.fileName.localeCompare(b.createdAt, undefined, { numeric: true })
      );
    } else if (sortBy === "b") {
      return arr.sort((a, b) =>
        a.fileName.localeCompare(b.fileName, undefined, { numeric: true })
      );
    } else if (sortBy === "c") {
      return arr.sort((a, b) =>
        b.fileName.localeCompare(a.fileName, undefined, { numeric: true })
      );
    }
    return arr;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles["custom-select"]} id="customSelect">
          <select value={sortBy} onChange={handleChange}>
            <option value="a">sort by created at ascendent</option>
            <option value="b">sort by filename ascendent</option>
            <option value="c">sort by filename descendent</option>
          </select>
          <div className={styles["select-arrow"]}>&#9660;</div>
        </div>

        <div className={styles["list-container"]}>
          <ul>
            {sortList(list).map((item, index) => (
              <li key={index} className={styles["list-item"]}>
                <p className={styles["list-item-text"]}>{item.fileName}</p>
                <p className={styles["list-item-text"]}>{item.createdAt}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // fetch data from an API

  const jsonData = await getData();

  return {
    props: {
      list: jsonData,
    },
  };
}
