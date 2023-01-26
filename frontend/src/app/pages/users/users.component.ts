import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(
    private router: Router, 
    private http: HttpClient,
  ){}
  ngOnInit(){
    this.userService = new UserService(this.http)

  }
  public user: User = {} as User;
  public senha : string;
  public mensagem: string;
  public users: User[] | undefined = [];
  private userService: UserService = {} as UserService;
  public ademir :string = "admin"

  async create() {
    let user = this.verificaValorVazio();
    if(user){
        await this.userService.createUser(user).then(_ => location.reload());
        alert("Usuário criado com sucesso");
    }
  }

  verificaValorVazio(){
    if(this.user.nome === "" || this.user.nome == undefined){
      this.mensagem = "Nome é obrigatório"
      return undefined
    }
    if(this.user.email === "" || this.user.email == undefined){
      this.mensagem = "Email inválido"
      return undefined
    }
    if(this.user.senha === "" || this.user.senha == undefined){
      this.mensagem = "Senha inválida"
      return undefined
    }
    this.user.id = 0;
    this.user.nivel = this.user.nivel.toLowerCase();
    return this.user
  }
}
