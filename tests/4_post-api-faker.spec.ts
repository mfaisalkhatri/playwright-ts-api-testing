import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

export function createOrderDetails() {
    const productAmount:number = faker.number.int({ min: 1, max: 100 });
    const qty:number = faker.number.int({ min: 1, max: 5 });
    const taxAmt:number = faker.number.int({ min: 2, max: 10 });
    const totalAmt:number = (productAmount*qty)+taxAmt;

    return {
    user_id: faker.number.int({ min: 1, max: 50 }),
    product_id: faker.number.int({ min: 1, max: 100 }),
    product_name: faker.commerce.productName(),
    product_amount: productAmount,
    qty:qty,
    tax_amt: taxAmt,
    total_amt: totalAmt
  };
}

export function createRandomOrders(count:number) {
    return faker.helpers.multiple(createOrderDetails, {count});
}


test('POST order details API using Faker library', async({request}) => {
  
    const orderData = createRandomOrders(5);
    console.log(orderData);
    const response = await request.post("http://localhost:3004/addOrder/", {
    data: orderData,
    headers: {
      "Content-Type": "application/json",
    },
});
    expect(response.status()).toBe(201);
  
});
