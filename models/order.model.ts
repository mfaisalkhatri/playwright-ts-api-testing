export interface Order {

    id:number,
    user_id: string,
    product_id: string,
    product_name: string,
    product_amount: number,
    qty: number,
    tax_amt: number,
    total_amt: number
}