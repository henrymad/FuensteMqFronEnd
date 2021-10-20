import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {

  employee: Employee = new Employee();
  manager: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    ){ }

  ngOnInit() {
    this.setEmployee();
    this.setRoleManager();
  }

  async setEmployee(){
    this.employee.token = await this.getToken() 
    this.employee.userName = this.getUser();
    this.employee.role =  "employee";
    this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        this.employee.name = response.data.name;
        this.employee.role =  this.employee.upperCaseEmployee(response.data.role);
        this.employee.position = this.employee.upperCaseEmployee(response.data.position);
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

  async getRole(): Promise<string>{
    const rol = await Storage.get({key: 'rol'});
    return rol.value;
  }

  getUser(){
    return this.activateRoute.snapshot.paramMap.get('username');
  }

  tracking():void{
    let userName:string = this.getUser();
    let state:string = "Staff";
    this.router.navigate([`manager/${state}/employee-profile/${userName}/tracking`]);
  }

  async setRoleManager(){
    this.manager.role = await this.getRole();
  }

  goManager(){
    this.router.navigate(['manager']);
  }

  goApproveHours(){
    let userName:string = this.getUser();
    let state:string = "Staff";
    this.router.navigate([`manager/${state}/employee-profile/${userName}/approve-hours`]);
  }

}
