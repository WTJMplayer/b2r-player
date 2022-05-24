import React from 'react'

const AudioUpload = () => {
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
            console.log(file)
            let url = 'http://localhost:3000/public/audio/upload'
            fetch(url, {
              method: 'POST',
              track: file,
              user: 'admin',
            })
          }
        }}
      />
    </div>
  )
}
export default AudioUpload
