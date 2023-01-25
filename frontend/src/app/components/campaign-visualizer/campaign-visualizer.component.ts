import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from 'src/app/services/campaign/campaign-service.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CampaignFormDialogComponent } from '../campaign-form-dialog/campaign-form-dialog.component';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { CdkDragDrop, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-campaign-visualizer',
  templateUrl: './campaign-visualizer.component.html',
  styleUrls: ['./campaign-visualizer.component.css']
})
export class CampaignVisualizerComponent {

  faXmark = faXmark

  constructor(
    public dialogRef: MatDialogRef<CampaignVisualizerComponent>,
    private campaignService: CampaignService,
    private produtoServico: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  campaign: Campaign = {} as Campaign;
  itensProdutos: any = [];
  apagaItem: any = [{ valor: "Delete aqui", desativado: true }];
  campanhasLista: Campaign[] = [];
  mostraCampanha = true;
  listaProdutos: any = [];

  ngOnInit() {
    this.populaPrateleira(this.data.id)
    this.getCampanha();
    this.getCampamnhas();
  }

  basket: any = [];
  basket1: any = [];
  basket2: any = [];
  basket3: any = [];
  basket4: any = [];
  basket5: any = [];
  listaBasket: any = [this.basket, this.basket1, this.basket2, this.basket3, this.basket4];


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


  closeDialog(): void {
    this.dialogRef.close();
  }
}
