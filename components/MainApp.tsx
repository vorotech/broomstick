import React, { useState } from "react";
import FindDuplicates from "../components/FindDuplicates";
import Button from "@material-ui/core/Button";
import styles from "../styles/Home.module.css";

function MainApp() {
  const [files, setFiles] = useState([]);

  const findDupl = async () => {
    const data = await fetch("/api/google-drive/find-duplicates");
    const files = await data.json();
    setFiles(files);
    console.log(files);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ padding: "10px 20px" }}>
        <Button variant="contained" color="primary" onClick={findDupl}>
          Find Duplicates
        </Button>
      </div>

      <div style={{ padding: "10px 20px" }}>
        <FindDuplicates files={files} />
      </div>
    </div>
  );
}

export default MainApp;
