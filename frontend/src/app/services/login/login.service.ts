import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, window  } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logged: boolean = false;
  public adm: boolean = false;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })}
  

  constructor(private router: Router, private http: HttpClient ) {
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

 public async authenticate(User: User){
  const result = await firstValueFrom(this.http.post<any>(`${environment.apiLogin}`, User));
  if(result && result.token){
    localStorage.setItem('token', result.token);
    localStorage.setItem("logged", "true")
    this.router.navigate([""])
    return true;
  }
  return false
  }

  getToken(){
    const token = localStorage.getItem('token')
    return token;
  }

  getTokenExpired(token: string): Date{
    const decoded: any = jwt_decode(token, { header: true });
    if (decoded.exp === undefined){
      return new Date(0);;
    }
    const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}
TokenExpired(token?: string):boolean{
  if(!token){
    return true;
  }
  const date = this.TokenExpired(token);
  if (date === undefined){
    return false;
  }

  return !(date.valueOf())
}
}

