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
    if(this.user.email != "" || this.user.senha != ""){
      /*if (this.user && this.user.id > 0) {
        if (confirm("Deseja mesmo atualizar esse usuário?")) {
          await this.userService.updateUser({
            id: this.user.id,
            nome: this.user.nome,
            email: this.user.email,
            senha: this.user.senha,
            nivel: this.user.nivel,
          });
        }
      }*/
      
        await this.userService.createUser({
          id: this.user.id,
          nome: this.user.nome,
          email: this.user.email,
          senha: this.user.senha,
          nivel: this.user.nivel.toLowerCase(),
        }).then(_ => location.reload());
        alert("Usuário criado com sucesso");
      }else{
        this.mensagem = "Usuário ou senha inválidos"
      }
  }
}
