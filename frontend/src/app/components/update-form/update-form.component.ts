import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit{



  constructor(
    private router:Router,
    private routerParams: ActivatedRoute,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    ){}


  private clientService: ClientService = {} as ClientService;
  public clients: Client[] | undefined = [];
  public client: Client = {} as Client;
  public clientbyId: Client | undefined= {} as Client;

  selectClient(cliente: Client) {
    this.client = cliente;
  }

  private async getClient(id:number){
      this.clientbyId = await this.clientService.getClientbyId(id);
      if(this.clientbyId){
        this.client = this.clientbyId;
      }
  }


  async save(){
    let cliente = this.verificaValorVazio();
    if(cliente){
      if(this.client.id && this.client.id != 0){
          const update = await this.clientService.updateClient(cliente).then(_ => location.reload());
          alert("Cliente atualizado");
          this.router.navigateByUrl("clients");
      }
    }
  }
  
  ngOnInit(): void {
    this.clientService = new ClientService(this.http)
    let id:number = this.routerParams.snapshot.params['id']
    if(id){
      this.getClient(id);
    }
  }

  verificaValorVazio(){
    if(this.client.nome === "" || this.client.nome == undefined){
      alert("Por favor, digite um nome válido");
      return undefined
    }
    if(this.client.telefone === "" || this.client.telefone == undefined){
      alert("Por favor, digite um telefone válido");
      return undefined
    }
    if(this.client.cpf === "" || this.client.cpf == undefined){
      alert("Por favor, digite um CPF válido");
      return undefined
    }
    if(this.client.email === "" || this.client.email == undefined){
      alert("Por favor, digite um email válido");
      return undefined
    }
    if(this.client.cep === "" || this.client.cep == undefined){
      alert("Por favor, digite um CEP válido");
      return undefined
    }
    if(this.client.cidade === "" || this.client.cidade == undefined){
      alert("Por favor, digite uma cidade válida");
      return undefined
    }
    if(this.client.estado === "" || this.client.estado == undefined){
      alert("Por favor, digite um estado válido");
      return undefined
    }
    if(this.client.logradouro === "" || this.client.logradouro == undefined){
      alert("Por favor, digite um logradouro válido");
      return undefined
    }
    if(this.client.numero == undefined || this.client.numero.toString() === "" ){
      alert("Por favor, digite um número válido");
      return undefined
    }
    if(this.client.bairro === "" || this.client.bairro == undefined){
      alert("Por favor, digite um bairro válido");
      return undefined
    }
    this.client.id = 0;
    return this.client
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;
}

