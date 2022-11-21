import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as path from "path";
import { requestUser, userLoginRouter } from "./loginRouter.js";
import { MongoClient } from "mongodb";
import { userDish } from "./DishRouter.js";
import { adminControl } from "./adminRouter.js";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("connected to mongo db");

  const db = mongoClient.db("catering");

  app.use(requestUser(mongoClient.db("catering")));
  app.use("/api/login", userLoginRouter(mongoClient.db("catering")));
  app.use("/api/dish", userDish(mongoClient.db("catering")));
  app.use("/api/admin", adminControl(mongoClient.db("catering")));
  app.post("/api/order", (req, res) => {
    const [...arr] = req.body;
    const list = arr.filter((o) => {
      return o != null;
    });
    const order = { id: 0, order: list };
    db.collection("orders").insertOne(order);
    console.log(order);
  });
});

app.use(express.static("../client/dist"));

//
app.use((req, res, next) => {
  if (!req.path.startsWith("/api/") && req.method === "GET") {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
});
