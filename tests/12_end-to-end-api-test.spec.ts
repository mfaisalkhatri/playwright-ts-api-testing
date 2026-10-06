import { test, expect } from "../fixtures/auth.fixture.js";
import orders from "../test-data/orders.json" with { type: "json" };
import updated_order from "../test-data/updated_order.json" with { type: "json" };
import partial_updated_order from "../test-data/partial_updated_order.json" with { type: "json" };

test.describe.configure({ mode: "serial" });
test.describe("End to End API tests", () => {
  let orderid: number;
  test(
    "POST order details API using JSON file",
    { tag: "@endtoend" },
    async ({ request }) => {
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
    },
  );

  test(
    "Get order and verify order details",
    { tag: "@endtoend" },
    async ({ request }) => {
      const response = await request.get("http://localhost:3004/getOrder/", {
        params: {
          id: orderid,
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
    },
  );

  test(
    "Update Order using PUT API Request",
    { tag: "@endtoend" },
    async ({ request, token }) => {
      const response = await request.put(
        `http://localhost:3004/updateOrder/${orderid}`,
        {
          data: updated_order,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );

      expect(response.status()).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual(
        expect.objectContaining({
          message: "Order updated successfully!",
          order: expect.objectContaining({
            user_id: updated_order.user_id,
            product_id: updated_order.product_id,
            product_name: updated_order.product_name,
            product_amount: updated_order.product_amount,
            qty: updated_order.qty,
            tax_amt: updated_order.tax_amt,
            total_amt: updated_order.total_amt,
          }),
        }),
      );
    },
  );

  test(
    "Update Partial Order using PATCH API Request",
    { tag: "@endtoend" },
    async ({ request, token }) => {
      const response = await request.patch(
        `http://localhost:3004/partialUpdateOrder/${orderid}`,
        {
          data: partial_updated_order,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual(
        expect.objectContaining({
          message: "Order updated successfully!",
          order: expect.objectContaining({
            product_id: partial_updated_order.product_id,
            product_name: partial_updated_order.product_name,
          }),
        }),
      );
    },
  );
  test(
    "Delete an order using DELETE API Request",
    { tag: "@endtoend" },
    async ({ request, token }) => {
      const response = await request.delete(
        `http://localhost:3004/deleteOrder/${orderid}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      expect(response.status()).toBe(204);
    },
  );

  test(
    "Order deleted sucessfully",
    { tag: "@endtoend" },
    async ({ request }) => {
      const response = await request.get("http://localhost:3004/getOrder/", {
        params: {
          id: orderid,
        },
      });
      expect(response.status()).toBe(404);
    },
  );
});
