import { CampaignService } from './../../services/campaign/campaign-service.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './../../services/product/product.service';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {CdkDragDrop, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem, CdkDragEnter} from '@angular/cdk/drag-drop';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { CampaignFormDialogComponent } from '../campaign-form-dialog/campaign-form-dialog.component';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent {

  constructor(
    private produtoServico:ProductService,
    private campaignService: CampaignService,
    public dialogRef: MatDialogRef<CampaignFormDialogComponent>
    ){}
    @ViewChild('tabelaProduto') list?: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
      const maxScroll = this.list?.nativeElement.scrollHeight;
      this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
    }

    faXmark = faXmark;

  campaign:Campaign= {} as Campaign;
  campanhasLista:Campaign[] =[];
  mostraCampanha = true;
  itensProdutos:any = [];
  listaProdutos:any = [];
  apagaItem:any =[{valor: "Delete aqui", desativado: true}];

  basket:any = [];
  basket1:any = [];
  basket2:any = [];
  basket3:any = [];
  basket4:any = [];
  basket5:any = [];

  prateleiras:any = [];
  listaBasket:any=[this.basket,this.basket1,this.basket2,this.basket3,this.basket4];
  ngOnInit(){
    this.getProduto();
    this.getCampanha();
    this.getCampamnhas();
  }


  async getCampamnhas(){
    let get = await this.campaignService.getCampaign()
    .then((r:any) => this.campanhasLista = r);
    this.mostraCampanhaMetodo()
    // console.log(this.campanhasLista)
   }

   mostraCampanhaMetodo(){
    if (this.campanhasLista.length == 0){
      this.mostraCampanha = false;
    }else{
      this.mostraCampanha = true;
    }
  }


  populaPrateleira(id:number){

    this.campaignService.getCampaignById(id)
    .then((r:any) => {

      console.log(JSON.parse(r.urlFotoPrateleira))
      let urlParse = JSON.parse(r.urlFotoPrateleira)
      let novaLista:any = [];
      urlParse.map((x:any) => novaLista.push(x))
      console.log(novaLista[1])
      // novaLista.push(urlParse)
      // console.log(novaLista)
      this.basket = novaLista[0]
      this.basket1=novaLista[1]
      this.basket2=novaLista[2]
      this.basket3=novaLista[3]
      this.basket4=novaLista[4]
    })
  }

  // deletaPrateleira(id:number){
  //   this.campaignService.deleteCampaign(id)
  //   this.getCampanha()
  // }

  async deletaPrateleira(product: Number){
    await this.campaignService.deleteCampaign(product)
    await this.getCampamnhas();
  }

  salvarCampanha(){
    this.campaignService.createCampaign({
      id: 0,
      nome: this.campaign.nome,
      descricao: this.campaign.descricao,
      data: this.campaign.data,
      urlFotoPrateleira: JSON.stringify(this.listaBasket)
    });
    // this.getCampaign();
    // this.clientObserver.updateQty();
   location.reload();
  }

  getCampanha(){
    this.campaignService.getCampaign().then(r => console.log(r))
  }

  async getProduto(){
    let a = await this.produtoServico.getProduct()
    .then( r => this.listaProdutos = r?.map(x => this.itensProdutos.push(x.nome)));
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.id)
    console.log(event.currentIndex)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.previousContainer.id == "tabela-produto"){
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    else if(event.container.id == "apaga-item"){
      console.log(event)
      event.previousContainer.data.splice(event.previousIndex,1)
    }
    else if (event.container.id != "tabela-produto"){
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
