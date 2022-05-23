const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  console.log("running in production mode");
  app.use(express.static(path.join(__dirname, "..client/build")));
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

app.get("/public/images/:image", (req, res) => {
  const image = req.params.image;
  try {
    res.sendFile(path.join(__dirname, `/public/images/${image}`));
  } catch (err) {
    console.error(err);
  }
});

app.post("/public/audio/:user/:track", (req, res) => {
  const user = req.params.user;
  const track = req.params.track;
  const filename = `${user}-${track}`;
  try {
    convertAudio(user.id, track, filename);
    res.send("success");
  } catch (err) {
    console.error(err);
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
