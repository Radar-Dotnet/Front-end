import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logged: boolean = false;
  public adm: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
    ) {
    this.notify();
  }

  login(user : any) : Observable<any>{
    // this.logged = true;
    return this.http.post(`${environment.api}login`, {
      email: user.email,
      senha: user.senha
    })
  }

  public verifyLogged(): boolean {
    this.notify();
    return this.logged;
  }

  public notify() {
    this.logged = localStorage.getItem("token") ? true : false;
    //this.adm = localStorage.getItem("adm") ? true : false;
  }
  public confirmation: boolean= false

  public logout() {
    this.confirmation = confirm("Deseja sair?")
    if(this.confirmation === true){
    localStorage.clear()
    this.logged = false
    this.adm = false
    console.log('aaaa')
    this.router.navigateByUrl("/login")
  }
  }
}
