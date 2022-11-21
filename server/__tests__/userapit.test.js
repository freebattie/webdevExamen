import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userLoginRouter } from "../loginRouter.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  await database.collection("users").deleteMany({});

  app.use("/api/login", userLoginRouter(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("movies api", () => {
  it("adds a new movie", async () => {
    await request(app)
      .post("/api/login/new")
      .send({
        name: "testing",
        username: "testuser",
        password: "1234",
      })
      .expect(200);
    expect(
      (
        await request(app).post("/api/login").send({
          username: "testuser",
          password: "1234",
        })
      ).expect(204)
    );
  });
});
