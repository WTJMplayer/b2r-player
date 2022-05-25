const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const Track = require("./models/Track");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const { convertAudio } = require("./utils/convertAudio");
const { graphqlUpload, graphqlUploadExpress } = require("graphql-upload");

const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 * 100 },
  })
);
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  console.log("running in production mode");
  app.use(express.static(path.join(__dirname, "../client/build/static")));
} else {
  console.log("running in development mode");
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/public/audio/:audio", (req, res) => {
  const audio = req.params.audio;
  try {
    res.sendFile(path.join(__dirname, `/public/audio/${audio}`));
  } catch (err) {
    console.error(err);
  }
});

app.get("/public/audio/:user/:audio", (req, res) => {
  const user = req.params.user;
  const audio = req.params.audio;
  try {
    res.sendFile(path.join(__dirname, `/public/audio/${user}/${audio}`));
  } catch (err) {
    console.error(err);
  }
});

app.get("/public/images/:image", (req, res) => {
  const image = req.params.image;
  try {
    res.sendFile(path.join(__dirname, `/public/images/${image}`));
  } catch (err) {
    console.error(err);
  }
});

app.post("/public/audio/upload", async (req, res) => {
  try {
    let user = "admin";
    let track = req.files.track;
    let fileName = track.name.split(".");
    let fileExtension = fileName[1];
    let trackName = fileName[0];

    fs.mkdirSync(`./public/audio/${user}`, { recursive: true });
    fs.mkdirSync(`./temp`, { recursive: true });
    let tempPath = `./temp/audio.${fileExtension}`;
    await track.mv(tempPath);
    await convertAudio(user, trackName, fileExtension);
    fs.rmSync(tempPath);

    let result = await Track.create({
      title: trackName,
      artist: user,
      album: "test",
      audioSrc: `http://164.90.135.34/public/audio/${user}/${trackName.replaceAll(
        " ",
        "-"
      )}.ogg`,
    });

    console.log(result);

    res.send({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      message: "File upload failed",
    });
  }
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  app.use(graphqlUploadExpress({ maxFileSize: 40000000, maxFiles: 1 }));
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
