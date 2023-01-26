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
    let produto = this.verificaValorVazio();
    if(produto){
      await this.productService.createProduct(produto)
      .then(_ => location.reload());
      this.productObserver.updateQty();
      this.getProducts();
    }
  }

  verificaValorVazio(){
    debugger
    if(this.product.nome === "" || this.product.nome == undefined){
      alert("Por favor, digite um nome válido");
      return undefined
    }
    if(this.product.qtdEstoque == undefined || this.product.qtdEstoque.toString() == ""){
      alert("Por favor, digite uma quantidade válida");
      return undefined
    }
    if(this.product.valor == undefined || this.product.valor.toString() == ""){
      alert("Por favor, digite um valor válido");
      return undefined
    }
    if(this.product.descricao === "" || this.product.descricao == undefined){
      alert("Por favor, digite uma descrição válida");
      return undefined
    }
    this.product.id = 0;
    console.log(this.product);
    return this.product
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}
