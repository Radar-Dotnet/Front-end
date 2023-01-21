import { CampaignService } from './../../services/campaign/campaign-service.service';
import { Campaign } from './../../interfaces/campaign.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-campaign-form-dialog',
  templateUrl: './campaign-form-dialog.component.html',
  styleUrls: ['./campaign-form-dialog.component.css']
})
export class CampaignFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CampaignFormDialogComponent>,
    private campaignService : CampaignService
  ){}
  public campaign:Campaign= {} as Campaign;
  // private campaignService:CampaignService = {} as CampaignService;

  faXmark = faXmark;


  closeDialog(): void {
    this.dialogRef.close();
  }

  create(){
    this.campaignService.createCampaign({
      id: 0,
      nome: this.campaign.nome,
      descricao: this.campaign.descricao,
      data: this.campaign.data,
      urlFotoPrateleira: this.campaign.urlFotoPrateleira
    });
    // this.getCampaign();
    // this.clientObserver.updateQty();
    location.reload();
  }
}
