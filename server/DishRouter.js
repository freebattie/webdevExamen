import express from "express";

export function userDish(mongodb) {
  const dish = express.Router();

  // open for enyone, even if logged out
  dish.get("/", async (req, res) => {
    const dishes = await mongodb.collection("dishes").find().toArray();

    return res.json(dishes);
  });
  //TODO: add PUT;DELETE AND POST

  // admins and emploiees get all  orders, users gets there order
  dish.get("/orders", async (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username, role } = req.user;
    let orders;
    if (role == "admin" || role == "employee") {
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
