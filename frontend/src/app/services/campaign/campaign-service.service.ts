import { Campaign } from './../../interfaces/campaign.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  public async getCampaign(): Promise<Campaign[] | undefined>{
    let campaign:Campaign[] | undefined = await firstValueFrom(this.http.get<Campaign[]>(`${environment.api}campanha`));
    return campaign;
  }

  public async getCampaignById(id: number): Promise<Campaign | undefined>{
    let campaign:Campaign | undefined = await firstValueFrom(this.http.get<Campaign>(`${environment.api}campanha/${id}`));
    return campaign;
  }

  public async createCampaign(campaign: Campaign): Promise<Campaign | undefined>{
    let newCampaign:Campaign | undefined = await firstValueFrom(this.http.post<Campaign>(`${environment.api}campanha`, campaign));
    return newCampaign;
  }

  public async deleteCampaign(productId: Number){
    await firstValueFrom(this.http.delete(`${environment.api}campanha/${productId}`));
  }

  public async updateCampaign(campaign: Campaign): Promise<Campaign | undefined>{
    let CampaignUpdate: Campaign | undefined = await firstValueFrom(this.http.put<Campaign>('https://localhost:7058/api/campanha/'+campaign.id, campaign ));
    return CampaignUpdate;
  }

  public async atualizaCampaign(campaign: Campaign): Promise<Campaign | undefined> {
    console.log(campaign)
    debugger
    const up = await firstValueFrom(this.http.put<Campaign>('https://localhost:7058/api/campanha/'+ campaign.id, campaign))
    console.log('atualiza chamado')
    return up;
  }

}
