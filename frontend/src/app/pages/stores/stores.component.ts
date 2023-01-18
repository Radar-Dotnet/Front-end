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

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
  ) { }

  //Criado para poder replicar Pagina Cashflow como base de layout:
  public orders: Order[] | undefined = [];
  public lastOrder: Order | undefined = {} as Order;
  public lastOrderClient: Client | undefined = {} as Client;
  public lastOrdererdProcuct: OrderProduct[] | undefined = [];
  public totalOrderProducts: OrderProduct[] | undefined = [];
  public thisYear: [{ month: number, value: number }] = [{}] as [{ month: number, value: number }];
  public lastYear: [{ month: number, value: number }] = [{}] as [{ month: number, value: number }];
  public thisYearData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public lastYearData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public thisYearRevenue: number = 0;
  public lastYearRevenue: number = 0;
  public percentage: number = 0;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      { data: this.lastYearData, label: 'Ano Anterior', borderRadius: 2, borderColor: '#680BEA', backgroundColor: '#680BEA' },
      { data: this.thisYearData, label: 'Esse Ano', borderColor: '#a776eb', backgroundColor: '#a776eb' }
    ]
  };


  //Google Maps
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: true
    }
  ]


  ngOnInit(): void {
  }

}
