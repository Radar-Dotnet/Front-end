import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-product-dialog',
  templateUrl: './detail-product-dialog.component.html',
  styleUrls: ['./detail-product-dialog.component.css']
})
export class DetailProductDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DetailProductDialogComponent>,
    private teste: ProductService
  ) {}

  // private productService: ProductService = {} as ProductService;
  public products: Product[] | undefined = [];
  public product: Product = {} as Product;

  // selectProduct(producte: Product){
  //   this.product = producte;
  // }

// save(){
//     // if(this.product.id && this.product.id != 0){
//     //     const update = await this.productService.updateProduct(this.product);
//     //     // this.router.navigateByUrl("products");
//     // }

//     // const update = await this.productService.updateProduct(this.dialogRef.componentInstance.product)
//     let a = this.dialogRef.componentInstance.product
//     const update = this.productService.updateProduct(a)
//   }

   async save(){
     const a = await this.teste.atualizaProduto(this.product).then(_ => location.reload())
    // if(this.product.id && this.product.id != 0){
    //     const update = await this.productService.updateProduct(this.product);
        // this.router.navigateByUrl("clients"s);
    // }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}
