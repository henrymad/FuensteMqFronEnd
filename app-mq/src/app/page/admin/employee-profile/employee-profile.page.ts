import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage'

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
    ){ }

  ngOnInit() {
    this.setEmployee();
  }

  async setEmployee(){
    this.employee.role = await this.getRole();
    this.employee.token = await this.getToken() 
    this.employee.userName = this.getUser();
    this.employee.id = Number(this.getUser());
    this.employee.role =  "Employee";
    this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        this.employee.name = response.data.name;
        this.employee.role =  "Employee"; //this.employee.upperCaseEmployee(response.data.role);
        this.employee.position = "Employee"; //this.employee.upperCaseEmployee(response.data.position);
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
    return this.activateRoute.snapshot.paramMap.get('user');
  }

  tracking():void{
    let userName:string = "2";
    let state:string = "Staff";
    this.router.navigate([`admin/${state}/employee-profile/${userName}/tracking`]);

  }

}
