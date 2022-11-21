import express from "express";

//legger på brukeren og rolle til req hvis den finner brukeren, så kan eg bruke dette andre plasser til å begrense tilgang
export function requestUser(mongodb) {
  return async (req, res, next) => {
    const { username } = req.signedCookies;
    if (username) {
      const users = await mongodb.collection("users").find().toArray();
      console.log(users);
      req.user = users.find((u) => u.username === username);
      req.role = users.find((u) => {
        if (u.username === username) {
          return u.role;
        }
      });
    }
    next();
  };
}

export function userLoginRouter(mongodb) {
  const login = express.Router();
  login.get("/", (req, res) => {
    if (!req.user) {
      return res.sendStatus(204);
    }
    const { username, name, role } = req.user;
    return res.json({ username, name, role });
  });

  login.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (username === "" || password === "") {
      return res.sendStatus(403);
    }
    const users = await mongodb.collection("users").find().toArray();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    console.log(users);
    if (!user) {
      return res.sendStatus(401);
    }
    res.cookie("username", user.username, { signed: true });
    res.cookie("role", user.role, { signed: true });
    res.sendStatus(200);
  });
  login.post("/new", async (req, res, next) => {
    const { name, username, password } = req.body;
    const users = await mongodb.collection("users").find().toArray();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      res.sendStatus(403);
    } else {
      const result = mongodb.collection("users").insertOne({
        name,
        username,
        password,
        role: "user",
      });
      res.sendStatus(200);
    }
  });

  login.delete("/", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("role");
    res.sendStatus(204);
  });

  return login;
}
