import express from "express";

export function userDish(mongodb) {
  const dish = express.Router();

  // open for all too connect
  dish.get("/", (req, res) => {
    const { username, name, role } = req.user;
    return res.json({ username, name, role });
  });
  dish.post("/orders", (req, res) => {
    const [...arr] = req.body;
    const list = arr.filter((o) => {
      return o != null;
    });
    const order = { id: 0, order: list };
    mongodb.collection("orders").insertOne(order);
    console.log(order);
  });
  return dish;
}
