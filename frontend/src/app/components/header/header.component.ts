import { Route, Router, Routes } from '@angular/router';
import { Component ,OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(public loginService: LoginService, private router : Router){}

  logout(){
    this.loginService.logout();
  }

  criarUser(){
    this.router.navigateByUrl('create-new-user');

  }
  ngOnInit(): void {}
  faCirclePlus = faPlus;
  faUser = faUser;
}
