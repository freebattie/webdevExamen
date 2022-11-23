import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userDish } from "../DishRouter.js";
import { requestUser, userLoginRouter } from "../loginRouter.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("dummything"));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  app.use(requestUser(database));
  await database.collection("users").deleteMany({});
  app.use("/api/login", userLoginRouter(database));
  app.use("/api/dish", userDish(database));
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
  await database.collection("users").insertOne(user);
  await database.collection("users").insertOne(user2);
  app.use(express.static("../client/dist"));
});
afterAll(() => {
  mongoClient.close();
});
describe("user router", () => {
  beforeAll(async () => {
    await request(app)
      .post("/api/login/new")
      .send({
        username: "test",
        password: "123",
      })
      .expect(200);
  });

  it("fails login with unknown user", async () => {
    await request(app)
      .post("/api/login")
      .send({ username: "nobody", password: "missing" })
      .expect(401);
  });

  it("login working", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);

    const res = await agent.get("/api/login").expect(200);
    const res2 = await agent.get("/").expect(200);
    expect(res.body.username).toContain("test");
  });
  it("wrong username working", async () => {
    await request(app)
      .post("/api/login")
      .send({ username: "xxx", password: "secret" })
      .expect(401);
  });

  it("requires login to view orders not logged inn", async () => {
    await request(app).get("/api/dish/orders").expect(401);
  });

  it("requires login to view orders loged inn", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    await agent.get("/api/dish/orders").expect(200);
  });
  it("requires login to view orders loged inn as user", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "frank", password: "1234" })
      .expect(200);
    await agent.get("/api/dish/orders").expect(200);
  });

  it("try to post and no axcess", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/dish/orders")
      .send({ username: "test", password: "1234" })
      .expect(401);
  });
  it("try to post with axcess", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    const list = [{ name: "test" }, { name: "test" }];

    await agent
      .post("/api/dish/orders")
      .send({ orders: [{ name: "yes" }, { name: "yes" }] })
      .expect(204);
  });

  it("logs in with registered user", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "frank", password: "1234" })
      .expect(200);
    const profileResponse = await agent.get("/");
    expect(profileResponse.status).toBe(200);
  });
});
