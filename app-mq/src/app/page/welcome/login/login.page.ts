import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Employee } from 'src/app/class/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  employee: Employee = new Employee();

  constructor(
    private logingService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.setEmployee();
    this.activate();
    this.unActive();
  }

  async login(userName:string, password:string){
    if(userName.length != 0 && password.length != 0){
      this.logingService.postInformationBasic(userName, password)
      .subscribe(
        response => {
          if(response.status != 200){
            this.errorCredentialsAlert(response.data.error_description);
          }
          else {
            console.log(response.data);
            console.log(response.data.usuario);
            this.setToken(response.data.access_token);
            this.setRol(response.data.rol);
            this.setUserName(response.data.usuario);
            if(response.data.rol == "employee"){
              this.router.navigate([`employee/${response.data.usuario}`]);
            }else {
              this.router.navigate([`${response.data.rol}`]);
            }
            
          }
      },
      error => console.log(error)); 
    }
    else{
      this.presentAlert();
    }
  }

  activate():boolean {
    const SIZE = 0;
    return this.employee.userName.length != SIZE && this.employee.password.length != SIZE
            ? true 
            : false; 
  }

  unActive():boolean {
    const SIZE = 0;
    return this.employee.userName.length === SIZE || this.employee.password.length === SIZE
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

  async setUserName(userNameValue:string){
    const user = await Storage.set({
      key: 'username',
      value: userNameValue
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      message: 'Some input is empty or is null, verify!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async errorCredentialsAlert(messageError:string) {
    const alert = await this.alertController.create({
      header: 'ERROR CREDENTIALS',
      message: `${messageError}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  setEmployee():void{
    this.employee.userName = "";
    this.employee.password = "";
  }

}
