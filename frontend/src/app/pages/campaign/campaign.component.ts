import { Campaign } from './../../interfaces/campaign.interface';
import { CampaignService } from './../../services/campaign/campaign-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormDialogComponent } from './../../components/campaign-form-dialog/campaign-form-dialog.component';
import { Component } from '@angular/core';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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

  constructor(
    private dialogRef : MatDialog,
    private campanhaService: CampaignService,
    public campaignObserver: CampaignObserverService
  ){}

  ngOnInit(): void {
    this.getCampamnhas()
    console.log(this.campanhasLista)
  }

  
  private campaignService:CampaignService = {} as CampaignService;
  public campaigns: Campaign[] | undefined = [];
  public campaign:Campaign= {} as Campaign;
  

//   openUpdateForm(campaign : Campaign){
//     const dialogRef = this.dialogRef.open(UpdateFormComponent);
//     dialogRef.componentInstance.campaign = campaign;
//  }

 
 async delete(campaign: Number){
  await this.campaignService.deleteCampaign(campaign)
  this.campaigns = await this.campaignService.getCampaign();
  this.campaignObserver.updateQty();
}

  async getCampamnhas(){
   let get = await this.campanhaService.getCampaign()
   .then((r:any) => this.campanhasLista = r);
   console.log(this.campanhasLista)
   this.mostraCampanhaMetodo()
  }

  mostraCampanhaMetodo(){
    // if (this.campanhasLista.length == 0){
    //   this.mostraCampanha = false;
    // }else{
    //   this.mostraCampanha = true;
    // }
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
    await this.campanhaService.deleteCampaign(id)
    await this.getCampamnhas();
  }

}

