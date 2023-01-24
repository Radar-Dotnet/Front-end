import { Campaign } from './../../interfaces/campaign.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  public async getCampaign(): Promise<Campaign[] | undefined>{
    let campaign:Campaign[] | undefined = await firstValueFrom(this.http.get<Campaign[]>(`${environment.api}campanha`, AppConstants.headerToken));
    return campaign;
  }

  public async getCampaignById(id: number): Promise<Campaign | undefined>{
    let campaign:Campaign | undefined = await firstValueFrom(this.http.get<Campaign>(`${environment.api}campanha/${id}`, AppConstants.headerToken));
    return campaign;
  }

  public async createCampaign(campaign: Campaign): Promise<Campaign | undefined>{
    let newCampaign:Campaign | undefined = await firstValueFrom(this.http.post<Campaign>(`${environment.api}campanha`, campaign, AppConstants.headerToken));
    return newCampaign;
  }

  public async deleteCampaign(productId: Number){
    await firstValueFrom(this.http.delete(`${environment.api}campanha/${productId}`, AppConstants.headerToken));
  }

  public async updateCampaign(campaign: Campaign): Promise<Campaign | undefined>{
    let CampaignUpdate: Campaign | undefined = await firstValueFrom(this.http.put<Campaign>(`${environment.api}campanha/${campaign.id}`, campaign , AppConstants.headerToken));
    return CampaignUpdate;
  }

  public async atualizaCampaign(campaign: Campaign): Promise<Campaign | undefined> {
    console.log(campaign)
    const up = await firstValueFrom(this.http.put<Campaign>(`${environment.api}campanha/${campaign.id}`, campaign, AppConstants.headerToken))
    console.log('atualiza chamado')
    return up;
  }

}
