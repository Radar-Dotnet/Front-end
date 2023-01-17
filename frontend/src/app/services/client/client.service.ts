import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/app/interfaces/client.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public async getClient(): Promise<Client[] | undefined>{
    let clients:Client[] | undefined = await firstValueFrom(this.http.get<Client[]>( environment.api +'cliente'));
    return clients;
  }

  // getCliente(): Client[]| undefined {
  //     return this.http.get('https://localhost:7058/' + 'cliente')
  // }

  public async getClientbyId(clientId: number): Promise<Client | undefined>{
    let client:Client | undefined = await firstValueFrom(this.http.get<Client>(`${environment.api}/clients/${clientId}`));
    return client;
  }

  public async createClient(client: Client): Promise<Client | undefined>{
    let newClient:Client | undefined = await firstValueFrom(this.http.post<Client>('https://localhost:7058/api/cliente/', client));
    return newClient;
  }

  // createClient(client: Client): Promise<Client | undefined>{
  //   let newClient: any= this.http.post<Client>('https://localhost:7058/api/cliente/', client);
  //   return newClient;
  // }

  postCliente(cliente:Client){
    return this.http.post<Client>('https://localhost:7058/api/cliente/',cliente)
  }

  public async deleteClient(clientId: Number){
    await firstValueFrom(this.http.delete('https://localhost:7058/api/cliente/' + clientId));
  }

  public async updateClient(client: Client): Promise<Client | undefined>{
    let clientUpdate: Client | undefined = await firstValueFrom(this.http.put<Client>('https://localhost:7058/api/cliente/'+client.id, client ));
    return clientUpdate;
  }

}
