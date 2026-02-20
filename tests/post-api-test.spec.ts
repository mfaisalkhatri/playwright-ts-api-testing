import { test, expect } from "@playwright/test";

test.only("POST order details API with static JSON Array", async ({ request }) => {
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
 headers: {
      ContentType: "application/json",
    },
});
  expect(response.status()).toBe(201);
});

