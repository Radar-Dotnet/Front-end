import { ProductService } from './../../services/product/product.service';
import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent {

  constructor( private produtoServico:ProductService){}

  items:any= [];

  basket:any = ['Oranges', 'Bananas', 'Cucumbers',"apples","grapes","dragon-fruits","Mangos","Lemons"];
  basket1:any = ['aaa', 'bbb', 'ccc','ddd','eee','fff','ggg'];


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
    .then( r => r?.map(x => this.items.push(x.nome)));
  }

  prateleiras:any =[1];

  adicionaPrateleira(){
    let teste = new Array()
    this.prateleiras.push(teste)
    console.log(this.prateleiras)
  }

  removePrateleira(){
    if(this.prateleiras.length > 1){
      this.prateleiras.pop()
    }else{
      alert('Nao')
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.previousContainer)
      console.log(event.container)

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
}
