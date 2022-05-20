import React from 'react'
import { useFilePicker } from 'use-file-picker'

const AudioUpload = () => {
  const [openFilePicker, { filesContent, loading }] = useFilePicker({
    accept: 'audio/*',
    multiple: false,
  })
  
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => openFilePicker()}>Upload File</button>
      <br />
      {filesContent.map((file, index) => {
        console.log(file, index)
        return <p key={index}>{file.name}</p>
      }
      )}
    </div>
  )
  }
export default AudioUpload