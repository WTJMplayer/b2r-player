import React from 'react'
import { useMutation } from '@apollo/client'
import { SINGLE_UPLOAD } from './utils/mutation/index'

const AudioUpload = () => {
  const [singleUpload] = useMutation(SINGLE_UPLOAD)
  function onChange({
    target: {
      validity, 
      files: [file],
    },
    
  }) {
    if (validity.valid) {
      console.log(file)
      singleUpload({ variables: { file } })
    }
  }


  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        required
        onChange={onChange}
      />
    </div>
  )
}
export default AudioUpload
