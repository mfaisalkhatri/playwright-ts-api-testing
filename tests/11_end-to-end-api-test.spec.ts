import { test, expect } from "../fixtures/auth.fixture.js";
import orders from "../test-data/orders.json" with { type: "json" };
import updated_orders from "../test-data/updated_orders.json" with { type: "json" };

test.describe("End to End API tests", () => {
  let orderid: number;
  test("POST order details API using JSON file", async ({ request }) => {
    const response = await request.post("http://localhost:3004/addOrder/", {
      data: orders,
    });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    const order = responseBody.orders[0];

    expect(order.id).not.toBeNull();
    expect(order.id).toBeDefined();
    expect(order.user_id).toEqual(orders[0].user_id);
    expect(order.product_name).toEqual(orders[0].product_name);

    orderid = order.id;
  });

  test("Get order and verify order details", async ({ request }) => {
    const response = await request.get("http://localhost:3004/getOrder/", {
      params: {
        user_id: 1,
      },
      failOnStatusCode: true,
    });

    const responseBody = await response.json();

    const order = responseBody.orders[0];
    expect(order.id).not.toBeNull();
    expect(order.id).toBeDefined();
    expect(order.user_id).toEqual(orders[0].user_id);
    expect(order.product_id).toEqual(orders[0].product_id);
    expect(order.product_name).toEqual(orders[0].product_name);
    expect(order.product_amount).toEqual(orders[0].product_amount);
    expect(order.qty).toEqual(orders[0].qty);
    expect(order.tax_amt).toEqual(orders[0].tax_amt);
    expect(order.total_amt).toEqual(orders[0].total_amt);
  });

  test("Update Order using PUT API Request", async ({ request, token }) => {
    const response = await request.put(
      `http://localhost:3004/updateOrder/${orderid}`,
      {
        data: updated_orders,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody).toEqual(
      expect.objectContaining({
        message: "Order updated successfully!",
        order: expect.objectContaining({
          user_id: updated_orders[0].user_id,
          product_id: updated_orders[0].product_id,
          product_name: updated_orders[0].product_name,
          product_amount: updated_orders[0].product_amount,
          qty: updated_orders[0].qty,
          tax_amt: updated_orders[0].tax_amt,
          total_amt: updated_orders[0].total_amt,
        }),
      }),
    );
  });


});
