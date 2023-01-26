import { CampaignVisualizerComponent } from './../../components/campaign-visualizer/campaign-visualizer.component';
import { Campaign } from './../../interfaces/campaign.interface';
import { CampaignService } from './../../services/campaign/campaign-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormDialogComponent } from './../../components/campaign-form-dialog/campaign-form-dialog.component';
import { Component } from '@angular/core';
import { faCirclePlus, faPenToSquare, faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import { cA } from 'chart.js/dist/chunks/helpers.core';
import { UpdateFormComponent } from 'src/app/components/update-form/update-form.component';
import { CampaignObserverService } from 'src/app/services/campaign/campaign-observer.service';
import { CampaignFormUpdateComponent } from 'src/app/components/campaign-form-update/campaign-form-update.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {

  public campanhasLista:Campaign[] =[];
  public mostraCampanha = true;

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faEye = faEye;

  constructor(
    private dialogRef : MatDialog,
    private campanhaService: CampaignService,
    public campaignObserver: CampaignObserverService
  ){}

  ngOnInit(): void {
    this.getCampanhas()
  }


  private campaignService:CampaignService = {} as CampaignService;
  public campaigns: Campaign[] | undefined = [];
  public campaign:Campaign= {} as Campaign;


//   openUpdateForm(campaign : Campaign){
//     const dialogRef = this.dialogRef.open(UpdateFormComponent);
//     dialogRef.componentInstance.campaign = campaign;
//  }


 async delete(campaign: Number){
  if (confirm("Tem certeza que deseja apagar essa campanha?")) {
    await this.campaignService.deleteCampaign(campaign)
    this.campaigns = await this.campaignService.getCampaign();
    this.campaignObserver.updateQty();
  }
}

  async getCampanhas(){
   let get = await this.campanhaService.getCampaign()
   .then((r:any) => this.campanhasLista = r);
   this.mostraCampanhaMetodo()
  }

  mostraCampanhaMetodo(){
    // if (this.campanhasLista.length == 0){
    //   this.mostraCampanha = false;
    // }else{
    //   this.mostraCampanha = true;
    // }
  }

  visualizer(id:number){
    this.dialogRef.open(CampaignVisualizerComponent,{data :{id}})
  }

  openDialogForm(){
    this.dialogRef.open(CampaignFormDialogComponent,{
    });
  }

  openUpdateForm(id : number){
    const dialogRef = this.dialogRef.open(CampaignFormUpdateComponent,{data :{id}});
    // dialogRef.componentInstance.product = product;
    // console.log(product);
 }

  async deleteCampanha(id:number){
  if (confirm("Tem certeza que deseja apagar essa campanha?")) {
      await this.campanhaService.deleteCampaign(id)
      await this.getCampanhas();
    }
  }

}

