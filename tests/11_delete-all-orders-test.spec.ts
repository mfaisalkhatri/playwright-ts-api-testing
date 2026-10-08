import { test, expect } from "../fixtures/auth.fixture.js";

test("Delete all orders",{tag: '@smoke'}, async ({ request, token }) => {
  const response = await request.delete(
    `http://localhost:3004/deleteAllOrders`,
    {
      headers: {
        Authorization: `${token}`,
      },
    },
  );

  expect(response.status()).toBe(204);
});