import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Employee } from 'src/app/class/employee';

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

  login(userName:string, password:string){
    if(userName.length != 0 && password.length != 0){
      this.logingService.postInformationBasic(userName, password)
      .subscribe(
        response => {
          this.setToken(response.data.access_token);
          this.setRol(response.data.rol)
          this.router.navigate([`employee/${response.data.usuario}`]);
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

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }

  setEmployee(){
    this.employee.userName = "";
    this.employee.password = "";
  }

}
