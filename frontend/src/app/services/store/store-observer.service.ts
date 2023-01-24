import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class StoreObserverService {

  constructor(private http: HttpClient) { 
    this.updateQty();
  }

  public storeQty: Number = 0;

  async updateQty(){
    let list = await new StoreService(this.http).getStore();
    this.storeQty = list ? list.length : 0;
  }
}
