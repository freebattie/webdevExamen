import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as path from "path";
import { requestUser, userLoginRouter } from "./loginRouter.js";
import { MongoClient } from "mongodb";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("connected to mongo db");

  app.use(requestUser(mongoClient.db("catering")));
  app.use("/api/login", userLoginRouter(mongoClient.db("catering")));
  const db = mongoClient.db("catering");
  app.get("/api/role", async (req, res) => {
    const { role } = req.signedCookies;
    const users = await db.collection("users").find().toArray();
    const usersNoPass = users.map(({ password, ...item }) => item);
    console.log(usersNoPass);
    if (role === "admin") {
      res.json(usersNoPass);
    } else if (role == "" || role == "" || role == null) {
      res.sendStatus(401);
    } else {
      res.sendStatus(403);
    }
  });
});

app.put("/api/role", (req, res) => {
  const { role } = req.signedCookies;
  if (role === "admin") {
    const data = req.json();
    users.forEach((u) => {
      if (u.username === data.username) {
        u.role = data.role;
        u.Name = data.name;
        u.username = data.username;
      }
    });
  }
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
