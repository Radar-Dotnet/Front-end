import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { Cep } from 'src/app/interfaces/cep.interface';
import { Estado } from 'src/app/interfaces/estado.inteface';
import { Store } from 'src/app/interfaces/store.interface';
import { ConsultaCepService } from 'src/app/services/cep/consulta-cep.service';
import { EstadoService } from 'src/app/services/estados/estados.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-update-form-dialog',
  templateUrl: './store-update-form-dialog.component.html',
  styleUrls: ['./store-update-form-dialog.component.css']
})
export class StoreUpdateFormDialogComponent {

  
  
  constructor(
    private router:Router,
    private routerParams: ActivatedRoute,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<StoreUpdateFormDialogComponent>,
    public consultaCep: ConsultaCepService,

    ){}

    ngOnInit(): void {
      this.storeService = new StoreService(this.http)
      let id:number = this.routerParams.snapshot.params['id']
      if(id){
        this.getStore(id);
      }
      this.consultaEstado = new EstadoService(this.http);
      this.importarEstados();

    }

  private storeService: StoreService = {} as StoreService;
  public stores: Store[] | undefined = [];
  public store: Store = {} as Store;
  public storebyId: Store | undefined= {} as Store;
  public cep: Cep[] | undefined;
  public estados: Estado[] | undefined;
  public consultaEstado: EstadoService = {} as EstadoService;


  selectStore(store: Store) {
    this.store = store;
  }

  private async getStore(id:number){
      this.storebyId = await this.storeService.getStorebyId(id);
      if(this.storebyId){
        this.store = this.storebyId;
      }
  }

  buscarCep() {
    let consulta = this.consultaCep.consultaCEP(this.store.cep)
      .pipe(take(1))
      .subscribe((cepLocalizado: any) => {
        this.store.bairro = cepLocalizado.bairro
        this.store.logradouro = cepLocalizado.logradouro
        this.store.cidade = cepLocalizado.localidade
        this.store.estado = cepLocalizado.uf
        this.store.complemento = cepLocalizado.complemento
      })
  }

  async importarEstados() {
    this.estados = await this.consultaEstado.listaEstados();
  }
  
  async save(){
    let loja = this.verificaValorVazio();
    if(loja){
      if(this.store.id && this.store.id != 0){
          const update = await this.storeService.updateStore(loja).then(_ => location.reload());
          alert("Loja atualizada")
          this.router.navigateByUrl("stores");

      }
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}
