import { test, expect } from "../fixtures/auth.fixture.js";

test("Update Partial Order using PATCH API Request", async ({
  request,
  token,
}) => {
  const updatedOrder = {
    user_id: "98",
    product_id: "214",
  };

  const id = 1;
  const response = await request.patch(
    `http://localhost:3004/partialUpdateOrder/${id}`,
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
        user_id: "98",
        product_id: "214",
      }),
    }),
  );
});
