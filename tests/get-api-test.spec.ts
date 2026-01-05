import { test, expect } from "@playwright/test";

test("Get Order details API test with status check", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
  });

  expect(response.status()).toBe(200);
});

test("Get Order details API test with multiple params", async ({ request }) => {
  const params = {
    id: 1,
    user_id: 1,
    product_id: 79,
  };
  const response = await request.get("http://localhost:3004/getOrder/", {
    params,
  });

  expect(response.status()).toBe(200);
});

test("Get Order details API test with headers", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    headers: {
      ContentType: "application/json",
    },
  });

  expect(response.status()).toBe(200);
});

test("Get order details API test with timeout", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    headers: {
      ContentType: "application/json",
    },
    timeout: 300,
  });

  expect(response.status()).toBe(200);
});
test("Get order details API test with fail on status code", async ({
  request,
}) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 6,
    },
    headers: {
      ContentType: "application/json",
    },
    failOnStatusCode: true,
  });
});

test("GET Order details and perform structure check", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message");
  expect(responseBody).toHaveProperty("orders");
  expect(responseBody.orders[0]).toHaveProperty("id");
  expect(responseBody.orders[0]).toHaveProperty("product_name");
});

test("Get order details and perform basic level verification", async ({
  request,
}) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();
  expect(responseBody.message).toBe("Order found!!");
  expect(Array.isArray(responseBody.orders)).toBeTruthy();
  expect(responseBody.orders.length).toBeGreaterThan(0);
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
  expect(order.user_id).toEqual("1");
  expect(order.product_id).toEqual("79");
  expect(order.product_name).toEqual("5 star 10gm Chocobar");
});

test("Get order and verify matching object and array", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();

  expect(responseBody).toMatchObject({
    message: "Order found!!",
    orders: expect.arrayContaining([
      expect.objectContaining({
        product_id: "79",
        product_name: "5 star 10gm Chocobar",
        product_amount: 5,
        qty: 1,
        tax_amt: 0.5,
        total_amt: 5.5,
      }),
    ]),
  });
});

test("Get order and verify matching object", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();

  const order = responseBody.orders[0];
  expect(order).toMatchObject({
    id: 1,
    user_id: "1",
    product_name: "5 star 10gm Chocobar",
    total_amt: 5.5,
  });
});

test("Get Order details API test with best practice", async ({ request }) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();

  expect(responseBody.message).toBe("Order found!!");
  expect(responseBody.orders.length).toBeGreaterThan(0);

  expect(responseBody.orders).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 1,
        product_name: "5 star 10gm Chocobar",
      }),
    ])
  );
});

test("Get order details API and attach the response details to the report", async ({
  request,
}, testInfo) => {
  const response = await request.get("http://localhost:3004/getOrder/", {
    params: {
      user_id: 1,
    },
  });

  expect(response.status()).toBe(200);

  const status = response.status();
  const statusText = response.statusText();
  const headers = response.headers();
  const body = await response.json();

  const fullResponse = {
    status,
    statusText,
    headers,
    body,
  };

  await testInfo.attach("Full API Response", {
    body: JSON.stringify(fullResponse, null, 2),
    contentType: "application/json",
  });
});