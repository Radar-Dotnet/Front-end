import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductObserverService } from 'src/app/services/product/product-observer.service';
import { ProductService } from 'src/app/services/product/product.service';

import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from 'src/app/components/product-form-dialog/product-form-dialog.component';
import { DetailProductDialogComponent } from 'src/app/components/detail-product-dialog/detail-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private productObserver: ProductObserverService,
    private dialogRef : MatDialog,
    ){}

  ngOnInit(): void {
    this.productService = new ProductService(this.http);
    this.getProducts();
    this.getPageNumber();
  }

  private productService: ProductService = {} as ProductService;
  public products: Product[] | undefined = [];
  public product: Product = {} as Product;

  public async getProducts(){
    this.products = await this.productService.getProduct();
    this.getPageNumber();
  }

  create(){
    this.productService.createProduct({
      id: 0,
      nome: this.product.nome,
      descricao: this.product.descricao,
      qtdEstoque: this.product.qtdEstoque,
      valor: this.product.valor
    });
    this.productObserver.updateQty();
    // this.getProducts();
  }

  async delete(product: Number){
    if (confirm("Tem certeza que deseja apagar esse produto?")) {
      await this.productService.deleteProduct(product)
      this.products = await this.productService.getProduct();
      this.productObserver.updateQty();
    }
  }

  selectProduct(product: Product){
    this.product = product;
  }

  openDialogForm(){
    this.dialogRef.open(ProductFormDialogComponent,{
    });
  }

  openUpdateForm(product : Product){
    const dialogRef = this.dialogRef.open(DetailProductDialogComponent);
    dialogRef.componentInstance.product = product;
 }

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;

  //Pagination

  public getPageNumber() {
    if (this.products) {
      let npages = Math.ceil(this.products.length / 10);
      for (let i = 1; i <= npages; i++) {
        this.pages.push(i);
      }
    }
  }

  pages: number[] = [];
  start: number = 0;
  end: number = 10;


  nextPage() {
    if (this.products && this.end >= this.products.length) return;
    this.start += 10;
    this.end += 10;
  }

  previousPage() {
    if (this.start <= 0) return;
    this.start -= 10;
    this.end -= 10;
  }
}
