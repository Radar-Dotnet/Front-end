import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";

  constructor(private router: Router, private loginService: LoginService) {   }

  ngOnInit(): void {   
    this.user = new User();
    
  }
   public async logar(){
    try{
      debugger
      this.user.email = this.email;
      this.user.senha = this.senha;
      const result = await this.loginService.authenticate(this.user);
      console.log(`login efetuado: ${result}`);
    }catch (error){
      console.error(error)
    }
    } 
  }
