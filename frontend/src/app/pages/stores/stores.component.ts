import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js'; //Criado para poder replicar Pagina Cashflow como base de layout
import { Client } from 'src/app/interfaces/client.interface'; //Criado para poder replicar Pagina Cashflow como base de layout
import { Order, OrderProduct } from 'src/app/interfaces/order.interface'; //Criado para poder replicar Pagina Cashflow como base de layout
import { ClientService } from 'src/app/services/client/client.service'; //Criado para poder replicar Pagina Cashflow como base de layout
import { OrderService } from 'src/app/services/order/order.service'; //Criado para poder replicar Pagina Cashflow como base de layout

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
  export class StoresComponent implements OnInit {
    onChoseLocation($event: MouseEvent) {
      throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
  ) { }

  //Criado para poder replicar Pagina Cashflow como base de layout:
  public lastOrder: Order | undefined = {} as Order;  
  public lastOrderClient: Client | undefined = {} as Client;
  public lastOrdererdProcuct: OrderProduct[] | undefined = [];
  public totalOrderProducts: OrderProduct[] | undefined = [];
  public location : Location;

  ////Google Maps!
  // Zoom level inicial
  zoom: number = 12;

  // Definição latitude e longitude (pensar em API pra carregar a loja que queremos ver)
  lat: number = -23.556796071136453;
  lng: number = -46.66129260425739;
  latForm: number = 0;
  lngForm: number = 0;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers = [ 
    {
      lat: -23.562313843399128,
      lng: -46.654531015829264,
      label: "Loja A",
      draggable: true
    },
    {
      lat: -23.557199852693863,
      lng: -46.655110036806654,
      label: "Loja B",
      draggable: false
    },
    {
      lat: -23.566734070580132, 
      lng: -46.65891781621633,
      label: "Loja C",
      draggable: true
    }
  ]

  addMarker(latNoClique: number, lngNoClique: number) {
    if(confirm("Confirma essa localização?") == true){
      this.markers.push({
        lat: latNoClique,
        lng: lngNoClique,
        label: "Teste",
        draggable: false
      })
      this.latForm = latNoClique;
      this.lngForm = lngNoClique;
      console.log(`latitude: ${latNoClique} e longitude: ${lngNoClique}`);
      //this.lat = clique.coords.lat;
    }
  }


}
interface Marker {
  lat: number;
  lng: number;
}

interface Location {
  latitude: number;
  longitude: number;
  mapType: string;
  zoom: number;
  markers: Array<Marker>;
}