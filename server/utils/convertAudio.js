const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("./ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath("./ffmpeg/bin/ffprobe.exe");
const fs = require("fs");
//convert a file

// ffmpeg()
//   .input("../../client/src/audio/1-hour-of-silence.mp3")
//   .save("../../client/src/audio/1-hour-of-silence.ogg");

module.exports = {
  convertAudio(user, file, fileName) {
    return new Promise((resolve, reject) => {
      ffmpeg()
      .input(
        fs.createReadStream(
          file
      ))
      .save(`./audio/${user}/${fileName}.ogg`)
        .on("end", () => {
          resolve(true);
          console.log("converted it boiiii");
        })
        .on("error", (err) => {
          reject(err);
          console.log("oopsie", err);
        });
    });
  },
};
