import React, { useEffect, useState } from "react";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import styles from "../styles/Home.module.css";
import { Checkbox } from "@material-ui/core";

function FindDuplicates({ files }) {
  const [allFiles, setAllFiles] = useState([]);

  const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 400 },
    { field: "size", headerName: "Size", width: 200 },
    { field: "modifiedTime", headerName: "Modified", width: 210 },
  ];

  useEffect(() => {
    setAllFiles(
      files
        .reduce((acc, file) => [...acc, ...file], [])
        .map((file) => {
          file.size = +file.size;
          file.modifiedTime = file.modifiedTime.replace(
            /(\S{10})T(\S{5})\S+/,
            "$1  $2"
          );
          return file;
        })
        .reverse()
    );
  }, [files]);
  // const allFiles = files
  //   .reduce((acc, file) => [...acc, ...file], [])
  //   .map((file) => {
  //     file.size = +file.size;
  //     console.log(file.modifiedTime);

  //     file.modifiedTime = file.modifiedTime.replace(
  //       /(\S{10})T(\S{5})\S+/,
  //       "$1  $2"
  //     );
  //     return file;
  //   })
  //   .reverse();

  return (
    <div>
      {/* <div style={{ minHeight: 400, width: "100%" }}>
        <DataGrid rows={allFiles} columns={columns} checkboxSelection />
      </div> */}

      <div>
        <div className={styles.item}>
          <div></div>
          <div>Name</div>
          <div>Folder</div>
          <div>Size</div>
          <div>Modified</div>
        </div>
        {allFiles.map((file) => (
          <div className={styles.item} key={file.id}>
            <div>
              <Checkbox color="primary" />
            </div>
            <div>{file.name}</div>
            <div>Folder</div>
            <div>{file.size}</div>
            <div>{file.modifiedTime}</div>
          </div>
        ))}
      </div>

      {/* <ol>{files.map((file, index) => 
        (<li key={index}><ul>{file.map(elem => ( <li key={elem.id}>{elem.name}</li>))}</ul></li>))}
      </ol> */}
    </div>
  );
}

export default FindDuplicates;
