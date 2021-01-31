import React from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid';

function FindDuplicates({ files }) {
  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
  ]

  //todo: remove index key
  return (
    <div>
      <div style={{ height: 400, width: '80vw' }}>
        <DataGrid rows={files} columns={columns} pageSize={5} checkboxSelection />
      </div>

      <ol>{files.map((file, index) => 
        (<li key={index}><ul>{file.map(elem => ( <li key={elem.id}>{elem.name}</li>))}</ul></li>))}
      </ol>
      
    </div>
  )
}

export default FindDuplicates
