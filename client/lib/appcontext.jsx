import React from "react";
import { fetchJSON, postJSON } from "./http.js";

export const Appcontext = React.createContext({
  async listDishes() {
    return await fetchJSON("/api/dishes");
  },
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async logInUser(user) {
    return await postJSON("/api/login/", user);
  },
  async createUser(user) {
    return await postJSON("/api/login/new", user);
  },
});