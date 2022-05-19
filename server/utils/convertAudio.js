const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('./ffmpeg/bin/ffmpeg.exe');
ffmpeg.setFfprobePath('./ffmpeg/bin/ffprobe.exe');

//convert a file

ffmpeg()
    .input('../../client/src/audio/acid.wav')
    .save('../../client/src/audio/acid.ogg')




// export default function convertAudio(file, fileName) {
//     return new Promise((resolve, reject) => {
//         ffmpeg(file)
//             .save(`./audio/${fileName}.ogg`)
//             .on('end', () => {
//                 resolve(true);
//                 console.log('converted it boiiii');
//             })
//             .on('error', (err) => {
//                 reject(err);
//                 console.log('oopsie', err);
//             });
//     });
// }
