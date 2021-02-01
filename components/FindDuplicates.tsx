import React from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid';

function FindDuplicates({ files }) {
  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 400 },
    { field: 'size', headerName: 'Size', width: 200 },
    { field: 'modifiedTime', headerName: 'Modified', width: 210 },

  ]

  const allFiles = files.reduce((acc, file) => [...acc, ...file], []).map(file => {
    file.size = +file.size
    return file
  })


  //todo: remove index key

  return (
    <div>
      <div style={{ minHeight: 400, width: '80vw' }}>
        <DataGrid rows={allFiles} columns={columns}  checkboxSelection />
      </div>

      <ol>{files.map((file, index) => 
        (<li key={index}><ul>{file.map(elem => ( <li key={elem.id}>{elem.name}</li>))}</ul></li>))}
      </ol>
      
    </div>
  )
}

export default FindDuplicates
