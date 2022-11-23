import express from "express";
import { ObjectID } from "mongodb";

export function userDish(mongodb) {
  const dish = express.Router();

  // open for enyone, even if logged out
  dish.get("/", async (req, res) => {
    const dishes = await mongodb.collection("dishes").find().toArray();

    return res.json(dishes);
  });
  dish.post("/", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role !== "admin" && req.user.role !== "emp") {
      return res.sendStatus(403);
    }
    const dish = {
      id: 0,
      name: "empty",
      price: 0,
      description: "empty",
      type: "empty",
    };

    mongodb.collection("dishes").insertOne(dish);
    return res.sendStatus(204);
  });
  dish.put("/", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role !== "admin" && req.user.role !== "emp") {
      return res.sendStatus(403);
    }

    const { _id, id, name, price, description, type } = req.body;

    const menu = { id, name, price, description, type };

    mongodb
      .collection("dishes")
      .updateOne({ _id: ObjectID(_id) }, { $set: menu })
      .catch((err) => console.error(`update failed with error: ${err}`));
    console.log("added :" + menu);
    return res.sendStatus(204);
  });
  dish.delete("/", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role != "admin" && req.user.role != "emp") {
      return res.sendStatus(403);
    }

    const { _id } = req.body;

    mongodb
      .collection("dishes")
      .deleteOne({ _id: ObjectID(_id) })
      .catch((err) => console.error(`update failed with error: ${err}`));

    return res.sendStatus(204);
  });

  // admins and emploiees get all  orders, users gets there order
  dish.get("/orders", async (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username, role } = req.user;
    let orders;
    if (role == "admin" || role == "emp") {
      orders = await mongodb.collection("orders").find().toArray();
      console.log(orders);
    } else {
      orders = await mongodb
        .collection("orders")
        .find({ id: username })
        .toArray();
    }

    return res.json(orders);
  });
  dish.post("/orders", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.user;
    const data = req.body;
    const list = data.orders.filter((o) => {
      return o != null;
    });
    data.id = username;
    data.orders = list;

    mongodb.collection("orders").insertOne(data);
    return res.sendStatus(204);
  });
  return dish;
}
