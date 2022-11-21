import express from "express";

export function adminControl(mongodb) {
  const admin = express.Router();
  admin.get("/", async (req, res) => {
    const users = await mongodb.collection("users").find().toArray();
    const { role } = req.signedCookies;
    if (role != "admin") {
      return res.sendStatus(403);
    }

    return res.json(users);
  });
  admin.put("/edit", async (req, res) => {
    const users = await mongodb.collection("users").find().toArray();
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
  return admin;
}
