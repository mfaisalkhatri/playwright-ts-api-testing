import { test, expect } from "@playwright/test";
import orders from '../test_data/orders.json' with {type: 'json'};

test("Create dummy orders" , async ({ request }) => {

  const response = await request.post("http://localhost:3004/addOrder/", {
    data: orders,
});
  expect(response.status()).toBe(201);
});