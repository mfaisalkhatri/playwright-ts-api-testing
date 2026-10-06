import { test, expect } from "@playwright/test";

type Order = {
  user_id: string;
  product_id: string;
  product_name: string;
  product_amount: number;
  qty: number;
  tax_amt: number;
  total_amt: number;
};

const orderData: Order[] = [
  {
    user_id: "1",
    product_id: "1",
    product_name: "iPhone",
    product_amount: 500,
    qty: 1,
    tax_amt: 5,
    total_amt: 505,
  },
  {
    user_id: "2",
    product_id: "2",
    product_name: "MacBook",
    product_amount: 1200,
    qty: 1,
    tax_amt: 12,
    total_amt: 1212,
  },
];

test.describe("Data Driven Create Order API Tests with Static Data", () => {
  for (const order of orderData) {
    test(`Create a new order - ${order.product_name}`, {tag: '@smoke'},async ({ request }) => {
      const orders: Order[] = [order];
      const response = await request.post("http://localhost:3004/addOrder/", {
        data: orders,
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status()).toBe(201);

      const responseBody = await response.json();

      expect(responseBody.orders).toEqual(
        expect.arrayContaining(
          orders.map((order) => expect.objectContaining(order)),
        ),
      );
    });
  }
});
