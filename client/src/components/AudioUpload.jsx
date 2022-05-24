import React from 'react'
import { useMutation } from '@apollo/client'
import { SINGLE_UPLOAD } from './utils/mutation/index'

const AudioUpload = () => {
  const [singleUpload] = useMutation(SINGLE_UPLOAD)

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        required
        onChange={(e) => {
          const validity = e.target.validity
          const file = e.target.files[0]
          if (validity.valid) {
            singleUpload({ variables: { file } })
          }
        }}
      />
    </div>
  )
}
export default AudioUpload
