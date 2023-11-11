require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const run = async () => {
  await db();

  app.use("/api", require("./routes"));

  app.use((_, res) => {
    res.status(404).send("API ONLINE");
  });


  app.listen(port, () => console.log(`http://localhost:${port}`));
};
run();
