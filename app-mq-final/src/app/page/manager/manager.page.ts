import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  manager: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.setManger();
  }

  async setManger(){
    this.manager.token = await this.getToken();
    this.manager.role = await this.getRole();
    this.manager.userName = await this.getUserName();
    this.employeeService.getInformationUser(this.manager.userName, this.manager.token, this.manager.role)
      .subscribe(
        userData => {
          console.log(userData);
         this.manager.photo = this.manager.convertBase64ToJpg(userData.data.avatar);
         this.manager.name = this.manager.upperCaseEmployee(userData.data.firstName).concat(" ").concat(this.manager.upperCaseEmployee(userData.data.lastName)); 
         this.manager.role = this.manager.upperCaseEmployee(userData.data.role.nameRole);
         this.manager.position = this.manager.upperCaseEmployee(userData.data.position.namePosition);
      })
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }

  async getRole(): Promise<string>{
    const rol = await Storage.get({key: 'rol'});
    return rol.value;
  }

  async getUserName(): Promise<string>{
    const user = await Storage.get({key: 'username'});
    return user.value;
  }

  goToStaff(){
    const STAFF:string = "Staff";
    this.router.navigate([`manager/${STAFF}`]);
  }

  goToBuilding(){
    const BUILDINGS:string = "Buildings";
    this.router.navigate([`manager/${BUILDINGS}`]);
  }

}


