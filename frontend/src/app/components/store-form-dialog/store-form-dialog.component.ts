import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreObserverService } from 'src/app/services/store/store-observer.service';
import { StoreService } from 'src/app/services/store/store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ConsultaCepService } from 'src/app/services/cep/consulta-cep.service';
import { take } from 'rxjs';
import { Estado } from 'src/app/interfaces/estado.inteface';
import { EstadoService } from 'src/app/services/estados/estados.service';


@Component({
  selector: 'app-store-form-dialog',
  templateUrl: './store-form-dialog.component.html',
  styleUrls: ['./store-form-dialog.component.css']
})
export class StoreFormDialogComponent {

    private storeService: StoreService = {} as StoreService;
    public stores: Store[] | undefined = [];
    public store: Store = {} as Store;
    public estados: Estado[] | undefined;
    public consultaEstado: EstadoService = {} as EstadoService;

  constructor(
    private http: HttpClient,
    private storeObserver: StoreObserverService,
    public dialogRef: MatDialogRef<StoreFormDialogComponent>,
    public consultaCep: ConsultaCepService,
  ) { }



  ngOnInit(): void {
    this.storeService = new StoreService(this.http);
    this.consultaEstado = new EstadoService(this.http);
    this.getStores();
    this.importarEstados();
  }


  private async getStores() {
    this.stores = await this.storeService.getStore();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;

  latNumber =0
  lngNumber =0

  // markers =[{ }]



  buscarCep(){
    this.consultaCep.consultaCEP(this.store.cep)
    .pipe(take(1))
    .subscribe((cepLocalizado:any) => {

      this.store.bairro = cepLocalizado.bairro
      this.store.logradouro = cepLocalizado.logradouro
      this.store.cidade = cepLocalizado.localidade
      this.store.estado = cepLocalizado.uf
      this.store.complemento = cepLocalizado.complemento

      let logradouroRegex = this.store.logradouro.replace(/ /g, "%20")
      let bairroRegex = this.store.bairro.replace(/ /g, "%20")

      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.store.numero}%20${logradouroRegex}%20${bairroRegex}&key=AIzaSyCnIfK7BtTm8MBkfrDMfbRuXI1zWGJoA6c`)
      .pipe(take(1))
      .subscribe((r:any) => {
        let lat = r.results[0].geometry.location.lat
        let lon = r.results[0].geometry.location.lng
        this.store.latitude = lat
        this.store.longitude = lon
        this.latNumber = Number(lat)
        this.lngNumber = Number(lon)
      })
    })
  }

  async importarEstados() {
    this.estados = await this.consultaEstado.listaEstados();
  }

  async create() {
    let loja = this.verificaValorVazio();
    if(loja){
        await this.storeService.createStore(loja)
        .then(_ => location.reload())
      this.getStores();
    }
  }
  verificaValorVazio(){
    if(this.store.nome === "" || this.store.nome == undefined){
      alert("Por favor, digite um nome válido");
      return undefined
    }
    if(this.store.cep === "" || this.store.cep == undefined){
      alert("Por favor, digite um CEP válido");
      return undefined
    }
    if(this.store.cidade === "" || this.store.cidade == undefined){
      alert("Por favor, digite uma cidade válida");
      return undefined
    }
    if(this.store.estado === "" || this.store.estado == undefined){
      alert("Por favor, digite um estado válido");
      return undefined
    }
    if(this.store.logradouro === "" || this.store.logradouro == undefined){
      alert("Por favor, digite um logradouro válido");
      return undefined
    }
    if(this.store.numero == undefined || this.store.numero.toString() === "" ){
      alert("Por favor, digite um número válido");
      return undefined
    }
    if(this.store.bairro === "" || this.store.bairro == undefined){
      alert("Por favor, digite um bairro válido");
      return undefined
    }
    if(this.store.latitude === "" || this.store.latitude == undefined){
      alert("Por favor, digite uma latitude válida");
      return undefined
    }
    if(this.store.longitude === "" || this.store.longitude == undefined){
      alert("Por favor, digite uma longitude válida");
      return undefined
    }
    this.store.latitude = this.store.latitude.toString();
    this.store.longitude = this.store.longitude.toString();
    this.store.id = 0;
    return this.store
  }

}
