import { test, expect } from "@playwright/test";
import { OrderBuilder } from "../builders/order.builder.js";
import { Order } from "../models/order.model.js";

test("Add Order details using Builder Design Pattern", async ({ request }) => {
  const orderDetails = new OrderBuilder().build();
  const orders: Order [] = [orderDetails];

  const response = await request.post("http://localhost:3004/addOrder/", {
    data: orders,
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.status()).toBe(201);
});

test.only("Add Specific Order details using Builder Design Pattern", async ({ request }) => {
  const orderDetails = new OrderBuilder().withUserID("56").withProductName("Donuts").build();
  const orders: Order [] = [orderDetails];

  console.log(orderDetails);
  const response = await request.post("http://localhost:3004/addOrder/", {
    data: orders,
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.status()).toBe(201);
});