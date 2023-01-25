import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: String = "";
  public senha: String = "";
  public mensagem: String = "";
  public user = { email: '', senha: ''};
  verificaLogin :any;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  // public login(){
  //     this.loginService.login(this.user)
  //     .pipe(take(1))
  //     .subscribe(data => {
  //     let token = data.token;
  //     localStorage.setItem("token", token);
  //   });
  //   this.router.navigateByUrl('');
  // }

  // logar() {
  //   if (this.user.email === "radar@login.com" && this.user.senha === "12345") {
  //     localStorage.setItem("logged", "true");
  //     localStorage.setItem("adm", "true");
  //     this.loginService.notify();
  //     this.router.navigateByUrl('');
  //   }

  //   else {
  //     this.mensagem = "Usuário ou senha inválidos"
  //     this.email = ""
  //     this.senha = ""
  //   }
  // }

  logar1() {
    if(this.user.email != "" && this.user.senha != ""){
      this.loginService.login(this.user)
      .pipe(take(1),tap(r => console.log(r)))
      .subscribe(r=> {
        let token = r.token;
        localStorage.setItem("token", token);
        console.log(r);
        this.verificaLogin = token;
        if(this.verificaLogin != ""){
          localStorage.setItem("logged", "true");
          localStorage.setItem("adm", "true");
          this.loginService.notify();
          this.router.navigateByUrl('')
        }
        else  {
          this.mensagem = "Usuário ou senha inválidos"
        }
      })
    }else{
      this.mensagem = "Usuário e senha são obrigatórios"
    }

    /*if(this.verificaLogin != null){
      console.log('teste')
    }
    else {
      this.mensagem = "Usuário ou senha inválidos"
      this.email = ""
      this.senha = ""
    }*/

    // if (true) {
    //   localStorage.setItem("logged", "true");
    //   localStorage.setItem("adm", "true");
    //   this.loginService.notify();
    //   this.router.navigateByUrl('');

    // }

  }
}
