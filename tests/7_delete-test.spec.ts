import { test, expect } from "../fixtures/auth.fixture.js";

test("Delete an order using DELETE API Request", async ({ request, token }) => {
  const id = 6;
  const response = await request.delete(
    `http://localhost:3004/deleteOrder/${id}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    },
  );

  expect(response.status()).toBe(204);
});
