import { StoreService } from 'src/app/services/store/store.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
     this.storeLat = r.latitude,
     this.storeLng = r.longitude,
     this.storeLatNum = Number(r.latitude)
     this.storeLngNum = Number(r.longitude)
     this.storeName = r.nome

    })
  }
}

