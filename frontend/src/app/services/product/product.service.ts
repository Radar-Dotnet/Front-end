import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public async getProduct(): Promise<Product[] | undefined>{
    let products:Product[] | undefined = await firstValueFrom(this.http.get<Product[]>(`${environment.api}Produto`, AppConstants.headerToken));
    return products;
  }

  public async getProductById(id: number): Promise<Product | undefined>{
    let product:Product | undefined = await firstValueFrom(this.http.get<Product>(`${environment.api}Produto/${id}`, AppConstants.headerToken));
    return product;
  }

  public async createProduct(product: Product): Promise<Product | undefined>{
    let newProduct:Product | undefined = await firstValueFrom(this.http.post<Product>(`${environment.api}Produto`, product, AppConstants.headerToken));
    return newProduct;
  }

  public async deleteProduct(productId: Number){
    await firstValueFrom(this.http.delete(`${environment.api}Produto/${productId}`, AppConstants.headerToken));
  }

  public async updateProduct(product: Product): Promise<Product | undefined>{
    let ProductUpdate: Product | undefined = await firstValueFrom(this.http.put<Product>(`${environment.api}Produto/${product.id}`, product , AppConstants.headerToken));
    return ProductUpdate;
  }

  public async atualizaProduto(product: Product): Promise<Product | undefined> {
    const up = await firstValueFrom(this.http.put<Product>(`${environment.api}Produto/${product.id}`, product, AppConstants.headerToken))
    return up;
  }

}
