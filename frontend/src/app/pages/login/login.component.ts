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
  user:User
  
  public email: string;
  public senha: string;
  public mensagem: string = "";

  constructor(private router: Router, private loginService: LoginService) {   }

  ngOnInit(): void {   
    this.user = new User();
    
  }
   logar(){
    this.loginService.authenticate(this.email, this.senha).subscribe(
      () => this.router.navigate(['email', this.email])
    )
    }
}
