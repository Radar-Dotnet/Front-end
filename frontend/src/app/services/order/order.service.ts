
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { Order, OrderProduct } from 'src/app/interfaces/order.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public async createOrder(order: Order ){
    // public async createOrder(order: Order, orderProduct: OrderProduct[] ){

    const createO = await firstValueFrom(this.http.post(`${environment.api}pedido`, order, AppConstants.headerToken))
    // let newOrder:Order | undefined = await firstValueFrom(this.http.post<Order>(`${environment.api}pedido`, order));
    // orderProduct.map(async product=>{
    //   let newOrderProduct: OrderProduct | undefined = await firstValueFrom(this.http.post<OrderProduct>(`${environment.api}pedido`, {
    //     id: 0,
    //     order_id: newOrder?.id,
    //     product_id: product.product_id,
    //     value: product.value,
    //     quantity: product.quantity
    //   }));
    //   let productUpdate:Product | undefined  =  await firstValueFrom(this.http.get<Product>(`${environment.api}pedido/${product.product_id}`));
    //   let stockUpdate:Product | undefined = await firstValueFrom(this.http.put<Product>(`${environment.api}pedido/${product.product_id}`,{
    //     id: productUpdate.id,
    //     nome: productUpdate.nome,
    //     descricao: productUpdate.descricao,
    //     valor: productUpdate.valor,
    //     qtdEstoque: productUpdate.qtdEstoque - newOrderProduct.quantity
    //   }))
    //   console.log(stockUpdate)
    // })
    return createO;
  }

  public async getOrder(): Promise<Order[] | undefined>{
    const orders:Order[] | undefined = await firstValueFrom(this.http.get<Order[]>(`${environment.api}pedido`, AppConstants.headerToken));
    return orders;
  }

  public async getOrderById(id: number): Promise<{order: Order, orderProducts: OrderProduct[]} | undefined>{
    const order:Order | undefined = await firstValueFrom(this.http.get<Order>(`${environment.api}pedido/${id}`, AppConstants.headerToken));
    const orderProduct: OrderProduct[] | undefined = await firstValueFrom(this.http.get<OrderProduct[]>(`${environment.api}orders-products`));
    return {order, orderProducts:orderProduct.filter(product=> product.order_id==order?.id)};
  }

  public async getOrderProduct():Promise<OrderProduct[] | undefined>{
    let orderProduct: OrderProduct[] | undefined =  await firstValueFrom(this.http.get<OrderProduct[]>(`${environment.api}orders-products`));
    return orderProduct;
  }

  public async getOrderProductByOrderId(orderId: number ):Promise<OrderProduct[] | undefined>{
    let orderProduct: OrderProduct[] | undefined =  await firstValueFrom(this.http.get<OrderProduct[]>(`${environment.api}orders-products`));
    return orderProduct;
  }



}
