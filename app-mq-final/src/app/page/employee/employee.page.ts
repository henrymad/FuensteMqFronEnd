import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, ResponseClocOut, ResponseEvent } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AVATAR_DEFAULT } from 'src/app/constants/constants';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  employee: Employee = new Employee();
  dataClockOut: ResponseEvent = new ResponseEvent();

  statusStart: boolean = true;
  statusIn: boolean = false;
  statusOut:boolean = false;
 
  constructor(
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    ){ }

  ngOnInit() {
    this.setEmployee();
    let date = new Date();
    console.log(date);
  }

  async setEmployee(){
    this.employee.role = await this.getRole();
    this.employee.token = await this.getToken() 
    this.employee.userName = this.getUser();
    this.employee.id = Number(this.getUser());
    this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(response => {
        console.log(response.data);
        this.employee.name = response.data.name;
        this.employee.role = this.employee.upperCaseEmployee(response.data.role);
        this.employee.position = this.employee.upperCaseEmployee(response.data.position);
        this.employee.hours = response.data.hours;
        if(this.employee.photo ==  null){
          this.employee.photo = AVATAR_DEFAULT;
        }
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

  start(state:boolean):void {
    if(state){
      this.statusStart = false;
      this.statusIn = state;
    }
    else{
      this.statusStart = false;
      this.statusOut = true;;
    }
  }

  async startShift(data: ResponseEvent){
    const state:string = await this.getState();
    if(state == "start"){
      this.statusIn = false;
      this.statusOut = data.status;
      this.dataClockOut = data;
    }
   
  }

  async endShift(result:any){
    const state:string = await this.getState();
    if(state == "end"){
      this.statusOut = false;
      this.statusStart = result.state;
      this.employee.hoursWorked = result.data;
      console.log(result.data);
      this.employee.isMensageActive = true;
      this.messange();
    }
  
  }
  messange(): void{
    let time: number = 3500;
    setTimeout(() => {
      this.employee.isMensageActive = false;
    }, time)
  }

  async getState(): Promise<string>{
    const state = await Storage.get({key: 'state'});
    return state.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.setEmployee();
      event.target.complete();
    }, 1000);
  }

  hoursWorked(week:any, weekNumber:number):number{

    return null;
  }

}
