import React from 'react'
import { useFilePicker } from 'use-file-picker'
import { useQuery } from '@apollo/client'
import { ADD_TRACK } from './utils/mutation/index'

const AudioUpload = () => {
  const [openFilePicker, { filesContent, uploading }] = useFilePicker({
    accept: 'audio/*',
    multiple: false,
  })
  

  if (uploading) return <p>Uploading file...</p>

  return (
    <div>
      <button onClick={() => openFilePicker()}>Upload File</button>
      <br />
      {filesContent.map((file, index) => {
        return <p key={index}>{file.name}</p>
      }
      )}
    </div>
  )
  }
export default AudioUpload