import { test as base, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

type MyFixtures = {
  token: string;
};

export const test = base.extend<MyFixtures>({
  token: async ({ request }, use) => {
    const response = await request.post("http://localhost:3004/auth", {
      data: JSON.stringify({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    await use(responseBody.token);
  },
});

export { expect } from '@playwright/test';