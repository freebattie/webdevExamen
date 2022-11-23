import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userDish } from "../DishRouter.js";
import { requestUser, userLoginRouter } from "../loginRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("dummything"));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  const user = {
    name: "test",
    username: "test",
    password: "1234",
    role: "admin",
  };
  await mongoClient.connect();
  const database = mongoClient.db("test_database");

  await database.collection("dishes").insertOne({ name: "test" });
  await database.collection("users").insertOne(user);
  app.use(requestUser(database));
  app.use("/api/dish", userDish(database));
  app.use("/api/login", userLoginRouter(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("dishes api", () => {
  it("get all dishes", async () => {
    await request(app).get("/api/dish").expect(200);
    expect(
      (await request(app).get("/api/dish").expect(200)).body.map(
        ({ name }) => name
      )
    ).toContain("test");
  });
  it("get all dishes", async () => {
    await request(app).get("/api/dish").expect(200);
    expect(
      (await request(app).get("/api/dish").expect(200)).body.map(
        ({ name }) => name
      )
    ).toContain("test");
  });
  it("add order", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    const dish = {
      id: 0,
      name: "empty",
      price: 0,
      description: "empty",
      type: "empty",
    };
    await agent.post("/api/dish").send(dish).expect(204);
  });
  it("add order not loged in", async () => {
    const agent = request.agent(app);

    const dish = {
      id: 0,
      name: "empty",
      price: 0,
      description: "empty",
      type: "empty",
    };
    await agent.post("/api/dish").send(dish).expect(401);
  });
  it("edit order", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    const dish = {
      id: 0,
      name: "empty",
      price: 0,
      description: "empty",
      type: "empty",
    };
    await agent.put("/api/dish").send(dish).expect(204);
  });
  it("delete order", async () => {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "test", password: "1234" })
      .expect(200);
    const dish = {
      id: 0,
      name: "empty",
      price: 0,
      description: "empty",
      type: "empty",
    };
    await agent.put("/api/dish").send(dish).expect(204);
    await agent.delete("/api/dish").send(dish).expect(204);
  });
});
