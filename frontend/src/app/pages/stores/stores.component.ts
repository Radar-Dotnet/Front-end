import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Cep } from 'src/app/interfaces/cep.interface';
import { Store } from 'src/app/interfaces/store.interface';
import { ConsultaCepService } from './../../services/cep/consulta-cep.service';
import { EstadoService } from './../../services/estados/estados.service';
import { take } from 'rxjs';
import { Estado } from 'src/app/interfaces/estado.inteface';

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
    this.consultaEstado = new EstadoService(this.http);
    this.importarEstados();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private routerParams: ActivatedRoute,
    public consultaCep: ConsultaCepService,
    ) { }
    
    //Criado para poder replicar Pagina Cashflow como base de layout:
    public store : Store = {} as Store;
    public location : Location;
    public cep : Cep[] | undefined;
    public estados: Estado[] | undefined;
    public consultaEstado: EstadoService = {} as EstadoService;

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
  /*public async buscarCep(){
    console.log(this.store.cep);
    this.cep = await firstValueFrom(this.http.get<Cep[]>(`${environment.cepApi}${this.store.cep}/json`));
    console.log(this.cep);
  }*/

  buscarCep(){
    let consulta = this.consultaCep.consultaCEP(this.store.cep)
    .pipe(take(1))
    .subscribe((cepLocalizado:any) => {
      console.log(cepLocalizado)
      this.store.bairro = cepLocalizado.bairro
      this.store.logradouro = cepLocalizado.logradouro
      this.store.cidade = cepLocalizado.localidade
      this.store.estado = cepLocalizado.uf
      this.store.complemento = cepLocalizado.complemento
    })
    console.log(consulta)
  }

  async importarEstados(){
    this.estados = await this.consultaEstado.listaEstados();
    console.log(this.estados);
  }
}