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
    console.log(this.campanhasLista)
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

}

