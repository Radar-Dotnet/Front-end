import { StoreService } from 'src/app/services/store/store.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/interfaces/store.interface';

@Component({
  selector: 'app-store-visualizer',
  templateUrl: './store-visualizer.component.html',
  styleUrls: ['./store-visualizer.component.css']
})
export class StoreVisualizerComponent {

  constructor(
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  public store: Store = {} as Store
  storeLat:any;
  storeLng:any;

  storeLatNum =0;
  storeLngNum =0;

  storeName:any;

  ngOnInit(): void {
    this.getStoreValues()
  }

  async getStoreValues(){
    await this.storeService.getStorebyId(this.data.id)
    .then(r => {
      this.store.latitude = r.latitude,
      this.store.longitude = r.longitude,
      this.store.nome = r.nome,
     this.store.logradouro = r.logradouro,
     this.store.estado = r.estado,
     this.store.cidade = r.cidade,
     this.store.cep = r.cep,
     this.storeLatNum = Number(r.latitude),
     this.storeLngNum = Number(r.longitude)
    })
  }
}

