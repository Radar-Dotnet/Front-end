import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  public async getUsers(): Promise<User[] | undefined>{
    let users:User[] | undefined = await firstValueFrom(this.http.get<User[]>(`${environment.api}usuario`, AppConstants.headerToken));
    return users;
  }

  public async getUserbyId(userId: number): Promise<User>{
    let user:User | undefined = await firstValueFrom(this.http.get<User>(`${environment.api}usuario/${userId}`, AppConstants.headerToken));
    return user;
  }

  public async createUser(user: User): Promise<User | undefined>{
    let newUser:User | undefined = await firstValueFrom(this.http.post<User>(`${environment.api}usuario`, user, AppConstants.headerToken));
    return newUser;
  }

  public async deleteUser(userId: Number){
  await firstValueFrom(this.http.delete(`${environment.api}usuario/${userId}`, AppConstants.headerToken));
  }
  public async updateUser(user: User): Promise<User | undefined>{
    let userUpdate: User | undefined = await firstValueFrom(this.http.put<User>(`${environment.api}loja/${user.id}`, user, AppConstants.headerToken));
    return userUpdate;
  }
}
