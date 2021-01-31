import React, { useState } from 'react'
import FindDuplicates from '../components/FindDuplicates'
import Button from '@material-ui/core/Button'

function MainApp() {
  const [files, setFiles] = useState([])

  const findDupl = async () => {
    const data = await fetch('/api/google-drive/find-duplicates')
    const files = await data.json()
    setFiles(files)
    console.log(files);   
  }
  
  return (
    <div>
      <Button color="inherit" onClick={findDupl}>Find Duplicates</Button>
      <FindDuplicates files={files}/>
    </div>
  )
}

export default MainApp
