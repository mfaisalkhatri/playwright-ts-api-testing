import { request } from "@playwright/test";
import orders from './test_data/orders.json' with {type: 'json'};

async function globalSetup() {

    console.log('Running Global Setup...');
    const apiContext = await request.newContext();
    const response = await apiContext.post("http://localhost:3004/addOrder/", {
    data: orders,
});
  if(response.status() !=201) {
    throw new Error ("Failed to create setup test data!");
  }
  console.log('Test data created successfully');
}

export default globalSetup;