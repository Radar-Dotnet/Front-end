import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignService } from './campaign-service.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignObserverService {

  constructor(private http: HttpClient) {
    this.updateQty();
   
 }

public campaignQty: Number = 0;

async updateQty(){
  let list = await new CampaignService(this.http).getCampaign();
  this.campaignQty = list ? list.length : 0;
}
}
