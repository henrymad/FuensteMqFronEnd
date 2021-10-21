import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {

  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
    ){ }

  ngOnInit() {
    this.setEmployee();
  }

  async setEmployee(){
    this.employee.token = await this.getToken() 
    this.employee.userName = this.getUser();
    this.employee.role =  this.getRoleProfile();
    this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        console.log(response.data);
        this.employee.name = response.data.firstName + " " + response.data.lastName;
        this.employee.role =  response.data.role.nameRole;
        this.employee.position = response.data.position.namePosition;
        this.employee.hours = response.data.hours;
        this.employee.photo = this.employee.convertBase64ToJpg(response.data.avatar);
        this.employee.weekHours = response.data.weekHours;
        this.employee.weeklyTotalHours = response.data.weeklyTotalHours;
      });
    
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode:'ios',
      header: 'We are sorry',
      message: 'This rol does not have permissions.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  
  getRoleProfile(){
    return this.activateRoute.snapshot.paramMap.get('role');
  }

  getUser(){
    return this.activateRoute.snapshot.paramMap.get('username');
  }

  getState(){
    return this.activateRoute.snapshot.paramMap.get('value');
  }

  tracking():void{
    if(this.employee.role == "manager"){
      this.presentAlert();
      return;
    }
    let userName:string = this.getUser();
    let state:string = this.getState();
    let role:string = this.getRoleProfile();
    this.router.navigate([`admin/${state}/${role}/${userName}/tracking`]);
  }

  goApprove():void{
    if(this.employee.role == "manager"){
      this.presentAlert();
      return;
    }
    let userName:string = this.getUser();
    let state:string = this.getState();
    let role:string = this.getRoleProfile();
    this.router.navigate([`admin/${state}/${role}/${userName}/approve-hours`]);

  }

}
