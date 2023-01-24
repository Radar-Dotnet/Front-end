import { ProductService } from './../../services/product/product.service';
import {Component} from '@angular/core';
import {CdkDragDrop, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem, CdkDragEnter} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent {

  constructor( private produtoServico:ProductService){}

  basketGenerico:any= [];
  items:any = [];
  itemsTeste:any = [];
  apagaItem:any =["Delete"];



  basket:any = [];
  basket1:any = [];
  basket2:any = [];
  basket3:any = [];
  basket4:any = [];
  basket5:any = [];

  prateleiras:any = [];
  copiaBasket:any = [...this.basket];

  // populaPrateleira(){
  //   for (let i = 0; i < this.prateleiras.length; i++) {
  //     this.prateleiras[i].push()
  //   }
  // }

  ngOnInit(){
    this.getProduto();
  }

  async getProduto(){
    let a = await this.produtoServico.getProduct()
    .then( r => this.itemsTeste = r?.map(x => this.items.push(x.nome)));
  }

  adicionaPrateleira(){
    let novaPrateleira = new Array()
    this.prateleiras.push(novaPrateleira);
    console.log(this.prateleiras)
  }

  removePrateleira(){
    if(this.prateleiras.length > 0){
      this.prateleiras.pop()
    }else{
      alert('Nao')
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.id)
    console.log(event.currentIndex)
    if (event.previousContainer === event.container) {
      // console.log(event.previousContainer)
      // console.log(event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.previousContainer.id == "cdk-drop-list-5"){
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    else if(event.container.id == "cdk-drop-list-6"){
      console.log(event)
      event.previousContainer.data.splice(event.previousIndex,1)
    }
    else if (event.container.id != "cdk-drop-list-5"){
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  drop1(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer)
    if (event.previousContainer === event.container) {
      // console.log(event.previousContainer)
      // console.log(event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // drop(event: CdkDragDrop<string[]>, list: CdkDropList) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }

  copyItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
        return;
    }
    const itemCopy = {...event.item.data};
    this.basketGenerico.push(itemCopy);
}




}
