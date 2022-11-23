import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userDish } from "../DishRouter.js";
import { requestUser, userLoginRouter } from "../loginRouter.js";
import cookieParser from "cookie-parser";
import path from "path";
import { adminControl } from "../adminRouter.js";

dotenv.config();
const user = {
  name: "test",
  username: "test",
  password: "1234",
  role: "admin",
};
const user2 = {
  name: "test",
  username: "frank",
  password: "1234",
  role: "user",
};
const user3 = {
  name: "test",
  username: "test",
  password: "1234",
  role: "emp",
};
const app = express();
app.use(bodyParser.json());
app.use(cookieParser("dummything"));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  database.collection("users").deleteMany({});
  app.use(requestUser(database));
  await database.collection("users").deleteMany({});
  app.use("/api/login", userLoginRouter(database));
  app.use("/api/dish", userDish(database));
  app.use("/api/admin", adminControl(database));

  await database.collection("users").insertOne(user);
  await database.collection("users").insertOne(user2);
  app.use(express.static("../client/dist"));
});
afterAll(() => {
  mongoClient.close();
});
describe("user router", () => {
  it("fails login with unknown user", async () => {
    await request(app).get("/api/admin").expect(403);
  });
  it("try to get all users", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    const list = [{ name: "test" }, { name: "test" }];

    const res = await agent.get("/api/admin/").expect(200);
    expect(res.body.map(({ name }) => name)).toContain("test");
  });
  it("logs in with registered user", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    user2.role = "emp";
    await agent.put("/api/admin").send(user2).expect(204);
  });
});
