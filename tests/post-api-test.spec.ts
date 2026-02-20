import { test, expect } from "@playwright/test";

test("POST order details API with static JSON Array", async ({ request }) => {
  const response = await request.post("http://localhost:3004/addOrder/", {
    data:[{
    user_id: "1",
    product_id: "82",
    product_name: "Cadbury Bar",
    product_amount: 12,
    qty: 2,
    tax_amt: 1,
    total_amt: 25
  },
  {
    user_id: "2",
    product_id: "80",
    product_name: "MilkyBar",
    product_amount: 10,
    qty: 1,
    tax_amt: 1,
    total_amt: 11
  }
],
});
  expect(response.status()).toBe(201);
});

test.only("POST order details API using JSON.Stringify", async ({ request }) => {

    const orderData = [{
        user_id: "5",
        product_id: "64",
        product_name: "Cadbury Mini",
        product_amount: 5,
        qty: 3,
        tax_amt: 1,
        total_amt: 16

    }];
  const response = await request.post("http://localhost:3004/addOrder/", {
    data: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    },
});
  expect(response.status()).toBe(201);
});