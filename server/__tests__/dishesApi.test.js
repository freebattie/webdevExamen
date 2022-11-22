import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userDish } from "../DishRouter.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  database.collection("dishes").insertOne({ name: "test" });
  await database.collection("movies").deleteMany({});
  app.use("/api/dish", userDish(database));
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
});
