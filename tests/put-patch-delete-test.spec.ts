import { test, expect } from "@playwright/test";


test("POST authentication and generate token", async ({ request }) => {

    const credentials = [{
        "username": "admin",
        "password": "secretPass123"

    }];
  const response = await request.post("http://localhost:3004/auth/", {
    data: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
});
  expect(response.status()).toBe(200);
});
