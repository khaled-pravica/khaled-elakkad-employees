import { useState } from "react";

import { WRONG_TYPE } from "../../constants/errorMsgs";

import styles from "./styles.module.css";

const FileInput = ({ setFileContent }) => {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.split(".").pop().toLowerCase() === "txt") {
        setError("");
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          setFileContent(reader.result);
        };
        reader.onerror = () => {
          setError(reader.error);
        };
      } else {
        setError(WRONG_TYPE);
      }
    }
  };

  return (
    <div>
      <p>Upload a text file from your machine</p>
      <input type="file" onChange={handleFileChange} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileInput;
