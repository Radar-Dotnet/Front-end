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
import { StoreService } from 'src/app/services/store/store.service';
import { faCirclePlus, faPenToSquare, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { StoreFormDialogComponent } from 'src/app/components/store-form-dialog/store-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StoreUpdateFormDialogComponent } from 'src/app/components/store-update-form-dialog/store-update-form-dialog/store-update-form-dialog.component';


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
    this.storeService = new StoreService(this.http)
    this.consultaEstado = new EstadoService(this.http);
    this.getStores();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private routerParams: ActivatedRoute,
    public consultaCep: ConsultaCepService,
    private dialogRef: MatDialog,
  ) { }

  //Criado para poder replicar Pagina Cashflow como base de layout:
  public store: Store = {} as Store;
  public stores: Store[] | undefined = [];
  public location: Location;
  public cep: Cep[] | undefined;
  public estados: Estado[] | undefined;
  public consultaEstado: EstadoService = {} as EstadoService;
  private storeService: StoreService = {} as StoreService;
  public faPenToSquareForm = faPenToSquare;
  public faCirclePlusForm = faCirclePlus;
  public faTrashCanForm = faTrashCan;
  public tituloDoBotao: string = "Cadastrar Loja";
  ////Google Maps!
  // Zoom level inicial
  zoom: number = 12;
  // Definição latitude e longitude (pensar em API pra carregar a loja que queremos ver)
  lat: number = -23.556796071136453;
  lng: number = -46.66129260425739;
  latForm: number = 0;
  lngForm: number = 0;
  estado: string;
  cidade: string;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  //Pins no mapa
  markers = [
    {
      lat: -23.562313843399128,
      lng: -46.654531015829264,
      logradouro: 'Av. Teste, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      label: "Loja A",
      draggable: true
    },
    {
      lat: -23.557199852693863,
      lng: -46.655110036806654,
      logradouro: 'Av. Teste, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      label: "Loja B",
      draggable: false
    },
    {
      lat: -23.566734070580132,
      lng: -46.65891781621633,
      logradouro: 'Av. Teste, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      label: "Loja C",
      draggable: true
    }
  ]

  //Filtragem no mapa

  estadoFiltro: string;
  cidadeFiltro: string;
  onFilterChange() {
    console.log(this.estadoFiltro);
    console.log(this.cidadeFiltro);
    //aqui você pode filtrar seus marcadores com base na variavel estadoFiltro
  }


  //Adiciona a lat+lon colocando um Pin no mapa
  // addMarker(latNoClique: number, lngNoClique: number) {
  //   if (confirm("Confirma essa localização?") == true) {
  //     this.markers.push({
  //       lat: latNoClique,
  //       lng: lngNoClique,
  //       label: "Teste",
  //       draggable: false
  //     })
  //     this.latForm = latNoClique;
  //     this.lngForm = lngNoClique;
  //     console.log(`latitude: ${latNoClique} e longitude: ${lngNoClique}`);
  //     //this.lat = clique.coords.lat;
  //   }
  // }

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
  }

  private async getStores() {
    this.stores = await this.storeService.getStore()
  }

  async delete(store: Number) {
    if (confirm("Tem certeza que deseja apagar essa loja?")) {
      await this.storeService.deleteStore(store);
      this.stores = await this.storeService.getStore();
    }
  }

  public async editStore(id: number) {
    console.log(id);
    this.store = await this.storeService.getStorebyId(id);
    this.latForm = Number(this.store.latitude);
    this.lngForm = Number(this.store.longitude);
    window.scrollTo(0, 0);
    this.tituloDoBotao = "Atualizar Loja";
  }

  openDialogForm() {
    this.dialogRef.open(StoreFormDialogComponent, {
    });
  }

  openUpdateForm(store : Store){
    const dialogRef = this.dialogRef.open(StoreUpdateFormDialogComponent);
    dialogRef.componentInstance.store = store;
 }

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faSearch = faSearch;
}
