export interface Order {
    id :Number,
    client_id :number,
    clienteId?: number,
    valorTotal :number,
    data : Date
}
export interface OrderProduct {
    id: number,
    order_id: number,
    product_id: number,
    value: number,
    quantity: number
}
