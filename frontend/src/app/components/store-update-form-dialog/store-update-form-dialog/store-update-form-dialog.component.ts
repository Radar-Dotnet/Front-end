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
      console.log(this.storebyId);
  }

  buscarCep() {
    let consulta = this.consultaCep.consultaCEP(this.store.cep)
      .pipe(take(1))
      .subscribe((cepLocalizado: any) => {
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
  
  async save(){
    if(this.store.id && this.store.id != 0){
        const update = await this.storeService.updateStore(this.store).then(_ => location.reload());
        this.router.navigateByUrl("stores");

    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}
