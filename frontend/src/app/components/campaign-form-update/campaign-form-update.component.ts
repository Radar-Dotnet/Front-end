import { take } from 'rxjs';
import { CampaignService } from './../../services/campaign/campaign-service.service';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { CampaignFormDialogComponent } from '../campaign-form-dialog/campaign-form-dialog.component';
import { ProductService } from 'src/app/services/product/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-campaign-form-update',
  templateUrl: './campaign-form-update.component.html',
  styleUrls: ['./campaign-form-update.component.css']
})

export class CampaignFormUpdateComponent {


  constructor(
    public dialogRef: MatDialogRef<CampaignFormDialogComponent>,
    private campaignService: CampaignService,
    private produtoServico: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  @ViewChild('tabelaProduto') list?: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  ngOnInit() {
    this.populaPrateleira(this.data.id)
    this.getCampanha();
    this.getCampamnhas();
    this.getProduto()
  }

  faXmark = faXmark;

  campaign: Campaign = {} as Campaign;
  itensProdutos: any = [];
  apagaItem: any = [{ valor: "Delete aqui", desativado: true }];
  campanhasLista: Campaign[] = [];
  mostraCampanha = true;
  listaProdutos: any = [];


  basket: any = [];
  basket1: any = [];
  basket2: any = [];
  basket3: any = [];
  basket4: any = [];
  basket5: any = [];
  listaBasket: any = [this.basket, this.basket1, this.basket2, this.basket3, this.basket4];

  async AtualizaCampanha() {
    await this.campaignService.atualizaCampaign({
      id: this.data.id,
      nome: this.campaign.nome,
      descricao: this.campaign.descricao,
      data: this.campaign.data,
      urlFotoPrateleira: JSON.stringify(new Array(this.basket, this.basket1, this.basket2, this.basket3, this.basket4))
    }
    ).then(_ => location.reload())
  }

  async getProduto() {
    await this.produtoServico.getProduct()
      .then(r => this.listaProdutos = r?.map(x => this.itensProdutos.push(x.nome)));
  }

  async getCampamnhas() {
    await this.campaignService.getCampaign()
      .then((r: any) => this.campanhasLista = r);
    this.mostraCampanhaMetodo()
    // console.log(this.campanhasLista)
  }

  mostraCampanhaMetodo() {
    if (this.campanhasLista.length == 0) {
      this.mostraCampanha = false;
    } else {
      this.mostraCampanha = true;
    }
  }

  async getCampanha() {
    await this.campaignService.getCampaign().then(r => r)
  }

  async populaPrateleira(id: number) {

    await this.campaignService.getCampaignById(id)
      .then((r: any) => {
        this.campaign.nome = r.nome
        this.campaign.descricao = r.descricao
        this.campaign.data = r.data
        let urlParse = JSON.parse(r.urlFotoPrateleira)
        let novaLista: any = [];
        urlParse.map((x: any) => novaLista.push(x))
        this.basket = novaLista[0]
        this.basket1 = novaLista[1]
        this.basket2 = novaLista[2]
        this.basket3 = novaLista[3]
        this.basket4 = novaLista[4]
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id == "tabela-produto") {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    else if (event.container.id == "apaga-item") {
      event.previousContainer.data.splice(event.previousIndex, 1)
    }
    else if (event.container.id != "tabela-produto") {
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
