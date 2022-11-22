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
app.use(cookieParser("dummything"));
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  app.use(requestUser(database));
  await database.collection("users").deleteMany({});
  app.use("/api/login", userLoginRouter(database));
  app.use("/api/dish", userDish(database));

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
        username: "somebody",
        password: "secret",
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
    await request(app)
      .post("/api/login")
      .send({ username: "somebody", password: "secret" })
      .expect(200);
  });
  it("wrong username working", async () => {
    await request(app)
      .post("/api/login")
      .send({ username: "xxx", password: "secret" })
      .expect(401);
  });

  it("requires login to view orders", async () => {
    await request(app).get("/api/dish/orders").expect(401);
  });

  it("shows users to logged in", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "somebody", password: "secret" })
      .expect(200);
    await agent.get("/api/login").expect(200);
  });

  it("logs in with registered user", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "somebody", password: "secret" })
      .expect(200);
    const profileResponse = await agent.get("/");
    expect(profileResponse.status).toBe(200);
  });
});
