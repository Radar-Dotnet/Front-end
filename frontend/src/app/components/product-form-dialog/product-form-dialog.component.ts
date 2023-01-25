import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductObserverService } from 'src/app/services/product/product-observer.service';
import { ProductService } from 'src/app/services/product/product.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent {

  constructor(
    private http: HttpClient,
    private productObserver: ProductObserverService,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.productService = new ProductService(this.http);
    this.getProducts();
  }

  private productService: ProductService = {} as ProductService;
  public products: Product[] | undefined = [];
  public product: Product = {} as Product;

  private async getProducts() {
    this.products = await this.productService.getProduct();
  }


  async create() {
    await this.productService.createProduct({
      id: 0,
      nome: this.product.nome,
      descricao: this.product.descricao,
      qtdEstoque: this.product.qtdEstoque,
      valor: this.product.valor
    }).then(_ => location.reload());
    this.productObserver.updateQty();
    this.getProducts();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}
