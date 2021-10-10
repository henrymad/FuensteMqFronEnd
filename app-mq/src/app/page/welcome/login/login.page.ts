import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    userName: "",
    password: ""
  }

  constructor(
    private logingService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activate();
    this.unActive();
  }

  login(userName:string, password:string){  
      this.logingService.postInformationBasic(userName, password)
      .subscribe(
        response => {
          console.log(response);
          this.setToken(response.data.access_token);
          this.setRol(response.data.rol)
          this.router.navigate([`employee/${response.data.usuario}`]);
      },
      error => console.log(error)); 
  }

  activate():boolean {
    const SIZE = 0;
    return this.user.userName.length != SIZE && this.user.password.length != SIZE
            ? true 
            : false; 
  }

  unActive():boolean {
    const SIZE = 0;
    return this.user.userName.length === SIZE || this.user.password.length === SIZE
            ? true
            : false;
  }

  async setToken(valueToken:string){
    const token = await Storage.set({
      key: 'token',
      value: valueToken
    });
  }

  async setRol(rolValue:string){
    const rol = await Storage.set({
      key: 'rol',
      value: rolValue
    });
  }

}
