const express = require("express");
const graphqlHTTP = require("express-graphql");
// const schema = require("./schema");
const cors = require("cors");
const bodyParser = require("body-parser");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const rootSchema = require("./graphql/schemas");
const rootValue = require("./graphql/resolvers");
const isAuth = require("./middlewares/auth");

const app = express();

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(bodyParser.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    rootValue,
    graphiql: true,
    // formatError: (err) => ({ message: err.message, status: err.status }),
  })
);

const dbName = "ghost-graphql";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    `mongodb+srv://ghost:${process.env.MONGO_PASSWORD}@cluster0-rjtg8.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("mongo connected ... ");
    app.listen(PORT, () => console.log("Started"));
  })
  .catch(err => {
    console.log(err);
  });
