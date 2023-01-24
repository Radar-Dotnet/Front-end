import { CampaignFormUpdateComponent } from './../../components/campaign-form-update/campaign-form-update.component';
import { Campaign } from './../../interfaces/campaign.interface';
import { CampaignService } from './../../services/campaign/campaign-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormDialogComponent } from './../../components/campaign-form-dialog/campaign-form-dialog.component';
import { Component } from '@angular/core';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
    private campanhaService: CampaignService
  ){}

  ngOnInit(): void {
    this.getCampamnhas()
  }

  async getCampamnhas(){
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
  // async delete(product: Number){
  //   await this.campanhaService.deleteCampaign(product)
  //   await this.campanhaService.getCampaign();
  // }


}

