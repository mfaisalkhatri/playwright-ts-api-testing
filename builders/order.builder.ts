import { Order } from "../models/order.model.js";
import {faker} from '@faker-js/faker';

export class OrderBuilder {

    private order:Order;

    constructor() {
        const product_amount = faker.number.int({ min: 1, max: 100 });
        const qty = faker.number.int({ min: 1, max: 5 });
        const tax_amt = faker.number.int({ min: 2, max: 10 });

        this.order = {
            user_id: this.generateUserId(),
            product_id: this.generateProductId(),
            product_name: faker.commerce.productName(),
            product_amount,
            qty,
            tax_amt,
            total_amt: (product_amount*qty)+tax_amt
        }
    }

    private generateUserId():string {
        return faker.number.int({min: 1, max: 50}).toString();
    }

    private generateProductId():string {
        return faker.number.int({ min: 1, max: 100 }).toString();
    }

    withUserID(user_id:string) {
        this.order.user_id = String(user_id);
        return this;
    }

    withProductId(product_id:string) {
        this.order.product_id=String(product_id);
        return this;
    }
    withProductName(product_name:string) {
        this.order.product_name = String(product_name);
        return this;

    }
    withProductAmount(product_amount:number) {
        this.order.product_amount= Number(product_amount);
        return this;
    }
    withQty(qty:number) {
        this.order.qty=Number(qty);
        return this;
    }

    withTaxAmt(tax_amt:number){
        this.order.tax_amt=Number(tax_amt);
        return this;
    }
    withTotalAmt(total_amt:number) {
        this.order.total_amt= Number(total_amt);
        return this;
    }

    build():Order{
        return this.order;
    }
}