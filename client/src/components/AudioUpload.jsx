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
            const fd = new FormData()
            fd.append('track', file)
            let url = 'http://localhost:3000/public/audio/upload'
            fetch(url, {
              method: 'POST',
              user: 'admin',
              body: fd,
            })
          }
          else {
            alert('Invalid file type')
          }
        }}
      />
    </div>
  )
}
export default AudioUpload
