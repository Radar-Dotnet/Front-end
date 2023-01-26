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
    let produto = this.verificaValorVazio();
    if(produto){
      const a = await this.teste.atualizaProduto(produto).then(_ => location.reload())
      // if(this.product.id && this.product.id != 0){
      //     const update = await this.productService.updateProduct(this.product);
          // this.router.navigateByUrl("clients"s);
      // }
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
