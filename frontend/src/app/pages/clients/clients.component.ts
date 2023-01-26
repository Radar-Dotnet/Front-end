import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientObserverService } from 'src/app/services/client/client-observer.service';
import { ClientService } from 'src/app/services/client/client.service';

import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/components/form-dialog/form-dialog.component';
import { UpdateFormComponent } from 'src/app/components/update-form/update-form.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public clientObserver: ClientObserverService,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit(): void {
    this.clientService = new ClientService(this.http)
    this.getClients();
  }

  private clientService: ClientService = {} as ClientService;
  public clients: Client[] | undefined = [];
  public client: Client = {} as Client;

  private async getClients() {
    this.clients = await this.clientService.getClient();
    this.getPageNumber();
  }

  async delete(client: Number) {
    if (confirm("Tem certeza que deseja apagar esse cliente?")) {
      await this.clientService.deleteClient(client)
      this.clients = await this.clientService.getClient();
      this.clientObserver.updateQty();
    }
  }

  openDialogForm() {
    this.dialogRef.open(FormDialogComponent, {
    });
  }

  openUpdateForm(client: Client) {
    const dialogRef = this.dialogRef.open(UpdateFormComponent);
    dialogRef.componentInstance.client = client;
  }

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;

  public getPageNumber() {
    if (this.clients) {
      let npages = Math.ceil(this.clients.length / 10);
      for (let i = 1; i <= npages; i++) {
        this.pages.push(i);
      }
    }
  }


  //Pagination
  pages: number[] = [];
  start: number = 0;
  end: number = 10;


  nextPage() {
    if (this.clients && this.end >= this.clients.length) return;
    this.start += 10;
    this.end += 10;
  }

  previousPage() {
    if (this.start <= 0) return;
    this.start -= 10;
    this.end -= 10;
  }

}

