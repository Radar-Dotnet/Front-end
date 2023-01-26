import { ConsultaCepService } from './../../services/cep/consulta-cep.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientObserverService } from 'src/app/services/client/client-observer.service';
import { ClientService } from 'src/app/services/client/client.service';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  constructor(
    private http: HttpClient,
    private clientObserver: ClientObserverService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    public consultaCep: ConsultaCepService
  ) { }

  ngOnInit(): void {
    this.clientService = new ClientService(this.http)
    this.getClients();
  }

  private clientService: ClientService = {} as ClientService;
  public clients: Client[] | undefined = [];
  public client: Client = {} as Client;

  private async getClients() {
    this.clients = await this.clientService.getClient()
  }

  consultandoCep() {
    this.consultaCep.consultaCEP(this.client.cep)
      .pipe(take(1))
      .subscribe((r: any) => {
        this.client.bairro = r.bairro
        this.client.logradouro = r.logradouro
        this.client.cidade = r.localidade
        this.client.estado = r.uf
      })
  }

  async create() {
    await this.clientService.createClient({
      id: 0,
      nome: this.client.nome,
      bairro: this.client.bairro,
      cep: this.client.cep,
      cidade: this.client.cidade,
      complemento: this.client.complemento,
      cpf: this.client.cpf,
      email: this.client.email,
      estado: this.client.estado,
      telefone: this.client.telefone,
      logradouro: this.client.logradouro,
      numero: this.client.numero
    }).then(_ => location.reload());
    this.getClients();
    this.clientObserver.updateQty();
  }

  async save() {
    if (this.client.id && this.client.id != 0) {
      const update = await this.clientService.updateClient(this.client);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  faXmark = faXmark;

  buscarCep() {
    let consulta = this.consultaCep.consultaCEP(this.client.cep)
      .pipe(take(1))
      .subscribe((cepLocalizado: any) => {
        this.client.bairro = cepLocalizado.bairro
        this.client.logradouro = cepLocalizado.logradouro
        this.client.cidade = cepLocalizado.localidade
        this.client.estado = cepLocalizado.uf
        this.client.complemento = cepLocalizado.complemento
      })
  }
}
