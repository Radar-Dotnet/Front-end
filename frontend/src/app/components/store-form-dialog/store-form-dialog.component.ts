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

      console.log(cepLocalizado)
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
        // this.markers =[{
        //   lat: this.latNumber,
        //   lng: this.lngNumber,
        //   logradouro: this.store.logradouro,
        //   cidade: this.store.cidade,
        //   estado: this.store.estado,
        //   label: this.store.nome}]
        this.latNumber = Number(lat)
        this.lngNumber = Number(lon)
      })
    })
  }

  async importarEstados() {
    this.estados = await this.consultaEstado.listaEstados();
  }

  async create() {
    console.log(this.store);
    if (this.store && this.store.id > 0) {
      if (confirm("Deseja mesmo atualizar essa loja?")) {
        await this.storeService.updateStore({
          id: this.store.id,
          nome: this.store.nome,
          observacao: this.store.observacao,
          cep: this.store.cep,
          logradouro: this.store.logradouro,
          numero: this.store.numero,
          bairro: this.store.bairro,
          cidade: this.store.cidade,
          estado: this.store.estado,
          complemento: this.store.complemento,
          latitude: this.store.latitude.toString(),
          longitude: this.store.longitude.toString()
        });
      }
    }
    else {
      console.log(
        this.store.id,
        this.store.nome,
        this.store.observacao,
        this.store.cep,
        this.store.logradouro,
        this.store.numero,
        this.store.bairro,
        this.store.cidade,
        this.store.estado,
        this.store.complemento,
        this.store.latitude,
        this.store.longitude
      )
      await this.storeService.createStore({
        id: this.store.id,
        nome: this.store.nome,
        observacao: this.store.observacao,
        cep: this.store.cep,
        logradouro: this.store.logradouro,
        numero: this.store.numero,
        bairro: this.store.bairro,
        cidade: this.store.cidade,
        estado: this.store.estado,
        complemento: this.store.complemento,
        latitude: this.store.latitude.toString(),
        longitude:  this.store.longitude.toString()
      }).then(_ => location.reload())
    }
    this.getStores();
  }

}
