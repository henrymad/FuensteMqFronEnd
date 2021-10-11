import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { DetailWeek, Employee } from 'src/app/class/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.page.html',
  styleUrls: ['./hours.page.scss'],
})
export class HoursPage implements OnInit {

  employee: Employee = new Employee();
  firstWeek: DetailWeek = new DetailWeek();
  secondWeek:DetailWeek = new DetailWeek();

  weekHours:number;

  isFirst:boolean = true;
  isSecond:boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit( ) {
    this.getEmployeeInformation();
  }

  async getEmployeeInformation(){
    this.employee.userName = this.getUser();
    this.employee.token = await this.getToken();
    this.employee.role = await this.getRole();
    this.employeeService.getInformationUser(this.employee.userName, this.employee.token, this.employee.role)
      .subscribe(
        response => {
        console.log(response);
        const {detailWeeklyTotalHours} = response.data;
        const [week1, week2] = detailWeeklyTotalHours;
        this.firstWeek = week1; 
        this.secondWeek = week2;
        this.weekCurrent(response.data.week, response.data.weekHours, response.data.weeklyTotalHours);         
      },
      error => console.log(error));
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }

  async getRole(): Promise<string>{
    const rol = await Storage.get({key: 'rol'});
    return rol.value;
  }

  getUser():string{
    return this.activateRoute.snapshot.paramMap.get('user');
  }

  weekCurrent(week:number, hours:number, hoursTotal:number):void{
    if(this.getWeek() == "weekcurrent"){
      this.weekHours = hours;
      if(week == 1){
        this.isSecond = false;
      }
      else{
        this.isFirst = false;
      }
    }
    else{
      this.isFirst = true;
      this.isSecond = true;
      this.weekHours = hoursTotal;
    }
  }

  getWeek():string {
    return this.activateRoute.snapshot.paramMap.get('week');
  }

}
