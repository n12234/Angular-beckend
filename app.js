const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const {PORT, DB_URL} = process.env;

const routes = require('./routes')
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = 3000;


async function connect(dbUrl) {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/demo_typescript");
    await mongoose.connect(dbUrl)
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

connect(DB_URL);

routes(app)

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
