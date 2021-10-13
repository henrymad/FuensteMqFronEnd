import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  admin: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private router:Router
    ) { }

  ngOnInit() {
    this.setAdmin();
  }

  async setAdmin(){
    this.admin.token = await this.getToken();
    this.admin.role = await this.getRole();
    this.admin.userName = await this.getUserName();
    this.employeeService.getInformationUser(this.admin.userName, this.admin.token, this.admin.role)
      .subscribe(
        userData => {
          console.log(userData);
         this.admin.photo = this.admin.convertBase64ToJpg(userData.data.avatar);
         this.admin.name = this.admin.upperCaseEmployee(userData.data.firstName).concat(" ").concat(this.admin.upperCaseEmployee(userData.data.lastName)); 
         this.admin.role = this.admin.upperCaseEmployee(userData.data.role.nameRole);
         this.admin.position = this.admin.upperCaseEmployee(userData.data.position.namePosition);
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
    this.router.navigate([`admin/${STAFF}`]);
  }

  goToBuilding(){
    const BUILDINGS:string = "Buildings";
    this.router.navigate([`admin/${BUILDINGS}`]);
  }


}
