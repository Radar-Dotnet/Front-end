import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { environment } from 'src/environments/environment';
import { Store } from '../../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  public async getStore(): Promise<Store[] | undefined>{
    let stores:Store[] | undefined = await firstValueFrom(this.http.get<Store[]>(`${environment.api}loja`, AppConstants.headerToken));
    return stores;
  }

  public async getStorebyId(storeId: number): Promise<Store>{
    let store:Store | undefined = await firstValueFrom(this.http.get<Store>(`${environment.api}loja/${storeId}`, AppConstants.headerToken));
    return store;
  }

  public async createStore(store: Store): Promise<Store | undefined>{
    let newStore:Store | undefined = await firstValueFrom(this.http.post<Store>(`${environment.api}loja`, store, AppConstants.headerToken));
    return newStore;
  }

  public async deleteStore(storeId: Number){
    await firstValueFrom(this.http.delete(`${environment.api}loja/${storeId}`, AppConstants.headerToken));
  }

  public async updateStore(store: Store): Promise<Store | undefined>{
    let storeUpdate: Store | undefined = await firstValueFrom(this.http.put<Store>(`${environment.api}loja/${store.id}`, store, AppConstants.headerToken));
    return storeUpdate;
  }

}
