import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';
import { Estado } from 'src/app/interfaces/estado.inteface';

export class EstadoService{

    constructor(private http:HttpClient) { }

    public async listaEstados(): Promise<Estado[] | undefined> {
        let estados: Estado[] | undefined = await firstValueFrom(this.http.get<Estado[]>(`${environment.estadosApi}`))
        return estados.sort((a, b) =>{
            return ('' + a.nome).localeCompare(b.nome.toString());
        });
    }
  }