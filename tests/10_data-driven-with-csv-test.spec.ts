import path from "node:path";
import { test, expect } from "@playwright/test";

import { getCSVTestData } from "../utils/csv-dataprovider.js";
import { Order } from "../models/order.model.js";


test.describe('Create Orders API', () => {

const orders: Order[] = getCSVTestData<Order>(
  path.join(process.cwd(), "test-data", "order_data.csv"),
);

orders.forEach((order: Order) => {
  test(`Create order for -> ${order.product_name}`,{tag: '@smoke'}, async ({ request }) => {
    const orders: Order[] = [order];

    const response = await request.post("http://localhost:3004/addOrder/", {
      data: orders,
       headers: {
          "Content-Type": "application/json",
        },
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const createdOrders = responseBody.orders;

    expect(createdOrders.id).not.toBeNull();
    expect(createdOrders).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user_id: order.user_id,
            product_name: order.product_name,
            product_amount: order.product_amount,
          }),
        ]),
      );
      console.log(orders);
});
});
});
