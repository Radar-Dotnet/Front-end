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

  private storeService: StoreService = {} as StoreService;
  public stores: Store[] | undefined = [];
  public store: Store = {} as Store;
  public estados: Estado[] | undefined;
  public consultaEstado: EstadoService = {} as EstadoService;


  private async getStores() {
    this.stores = await this.storeService.getStore();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;

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

  async importarEstados() {
    this.estados = await this.consultaEstado.listaEstados();
  }

  latForm: number = 0;
  lngForm: number = 0;

  async create() {
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
          latitude: this.latForm.toString(),
          longitude: this.lngForm.toString()
        });
      }
    }
    else {
      this.storeService.createStore({
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
        latitude: this.latForm.toString(),
        longitude: this.lngForm.toString()
      })
    }
    console.log(this.latForm.toString());
    console.log(this.lngForm.toString());
    this.getStores();
    location.reload();
  }
  
}
