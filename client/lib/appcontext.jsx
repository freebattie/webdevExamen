import React from "react";
import { deleteJSON, fetchJSON, postJSON, putJSON } from "./http.js";

export const Appcontext = React.createContext({
  async listDishes() {
    return await fetchJSON("/api/dish");
  },
  async updateDish(dish) {
    return await putJSON("/api/dish", dish);
  },
  async addDish(dish) {
    return await postJSON("/api/dish", dish);
  },
  async removeDish(dish) {
    return await deleteJSON("/api/dish", dish);
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
  async addOrder(order) {
    return await postJSON("/api/dish/orders", order);
  },
  async listOrders() {
    return await fetchJSON("/api/dish/orders");
  },
});
