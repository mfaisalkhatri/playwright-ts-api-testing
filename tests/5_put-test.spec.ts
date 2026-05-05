import { test, expect } from "../fixtures/auth.fixture.js";

test("Update Order using PUT API Request", async ({ request, token }) => {
  const updatedOrder = {
    user_id: "89",
    product_id: "124",
    product_name: "Lindt Choclate",
    product_amount: 50,
    qty: 3,
    tax_amt: 10,
    total_amt: 160,
  };

  const id = 1;
  const response = await request.put(
    `http://localhost:3004/updateOrder/${id}`,
    {
      data: JSON.stringify(updatedOrder),
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
        product_id: "124",
        product_name: "Lindt Choclate",
      }),
    }),
  );
});
