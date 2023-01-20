export interface Order {
    id :Number,
    clienteId :number,
    nomeCliente?: string,
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
