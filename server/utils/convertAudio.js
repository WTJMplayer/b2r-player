const ffmpeg = require("fluent-ffmpeg");
//convert a file

// ffmpeg()
//   .input("../temp/audio.mp3")
//   .save("../temp/output.ogg")

module.exports = {
  convertAudio(user, fileName, fileExtension) {
    return new Promise((resolve, reject) => {
      ffmpeg()
      .input(`./temp/audio.${fileExtension}`)
      .save(`./public/audio/${user}/${fileName}.ogg`)
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
