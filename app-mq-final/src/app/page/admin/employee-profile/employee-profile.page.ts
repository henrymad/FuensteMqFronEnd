import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { AVATAR_DEFAULT } from 'src/app/constants/constants';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {

  employee: Employee = new Employee();
  manager: Employee = new Employee();
  state:string;
  nameBuilding:string;

  constructor(
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
    ){ }

  ngOnInit() {
    this.setEmployee();
    this.setRoleManager();
    this.getState();
    this.getNameBuilding();
  }

  async setEmployee(){
    this.employee.token = await this.getToken() 
    this.employee.userName = this.getUser();
    this.employee.role =  this.getProfile();
    console.log(this.employee.role);
    if(this.employee.role === "employee"){
      this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        console.log(response)
        this.employee.name = response.data.name;
        this.employee.role =  response.data.role;
        this.employee.position = this.employee.upperCaseEmployee(response.data.position);
        this.employee.hours = response.data.hours;
        if(response.data.avatar == null){
          this.employee.photo = AVATAR_DEFAULT;
        }
        this.employee.photo = this.employee.convertBase64ToJpg(response.data.avatar);
        this.employee.weekHours = response.data.weekHours;
        this.employee.weeklyTotalHours = response.data.weeklyTotalHours;
      });
    }
    else{
      this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        console.log(response)
        this.employee.name = response.data.firstName + " " + response.data.lastName;
        this.employee.role =  response.data.role.nameRole;
        this.employee.position = response.data.position.namePosition;
        this.employee.hours = 0;
        this.employee.photo = this.employee.convertBase64ToJpg(response.data.avatar);
        this.employee.weekHours = 0;
        this.employee.weeklyTotalHours = 0;
      });
    }
    
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }

  async getRole(): Promise<string>{
    const rol = await Storage.get({key: 'rol'});
    return rol.value;
  }

  getUser(){
    return this.activateRoute.snapshot.paramMap.get('username');
  }

  tracking():void{
    if(this.employee.role == "manager" || this.employee.role == "admin"){
      this.presentAlert();
      return;
    }
    let userName:string = this.getUser();
    if(this.employee.role == "employee" || this.nameBuilding.length === 0){
      this.router.navigate([`admin/${this.state}/${this.employee.role}/${userName}/tracking`]);
    }
    else{
      this.router.navigate([`admin/${this.state}/${this.nameBuilding}/${this.employee.role}/${userName}/tracking`]);
    }
    
  }

  async setRoleManager(){
    this.manager.role = await this.getRole();
  }

  goApproveHours(){
    let userName:string = this.getUser();
    if(this.employee.role == "manager" || this.employee.role == "admin"){
      this.presentAlert();
      return;
    }
   
    if(this.employee.role == "employee" || this.nameBuilding.length === 0){
      this.router.navigate([`admin/${this.state}/${this.employee.role}/${userName}/approve-hours`]);
    }
    else{
      this.router.navigate([`admin/${this.state}/${this.nameBuilding}/${this.employee.role}/${userName}/approve-hours`]);
    }
  }

  getProfile(){
    return this.activateRoute.snapshot.paramMap.get('profile');
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

  getState(){
    this.state =  this.activateRoute.snapshot.paramMap.get('value');
  }

  getNameBuilding(){
    this.nameBuilding =  this.activateRoute.snapshot.paramMap.get('namebuilding');
  }

}
