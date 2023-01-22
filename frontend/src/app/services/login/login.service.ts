import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  getToken() {  }
  
  public logged: boolean = false;
  public adm: boolean = false;
  public token : string;  
  public header : any;  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })}
  

  constructor(private router: Router, private http: HttpClient, private tokenService: TokenService ) {
    this.notify();
      
  }

  public verifyLogged(): boolean {
    this.notify();
    return this.logged;
  }

  public notify() {
    this.logged = localStorage.getItem("logged") ? true : false;
    this.adm = localStorage.getItem("adm") ? true : false;
  }
  public confirmation: boolean = false

  public logout() {
    this.confirmation = confirm("Deseja sair?")
    if (this.confirmation === true) {
      localStorage.clear()
      this.logged = false
      this.adm = false

      this.router.navigateByUrl("/login")
    }
  }

  authenticate(email: string, senha: string){
    debugger
    return this.http.post(environment.apiLogin,
      {email, senha},
      {observe: 'response'}).pipe(tap(async res =>{
        const authtoken = res.headers.get('token');
        this.tokenService.setToken(await new Promise<any>((_resolve, reject) => {
            authtoken;
          }));
        console.log(`email ${email} autenticated wtih token ${authtoken}`)
      }))
  }
}

