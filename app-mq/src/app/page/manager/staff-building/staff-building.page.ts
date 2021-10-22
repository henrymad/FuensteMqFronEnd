import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-staff-building',
  templateUrl: './staff-building.page.html',
  styleUrls: ['./staff-building.page.scss'],
})
export class StaffBuildingPage implements OnInit {

  manager: Employee = new Employee();
  employee: Employee = new Employee();
  
  state:string;
  listEmployes: Array<any> = [];
  buildings: Array<any> = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private buildingService: BuildingService) { }

  ngOnInit() {
    this.getState(); 
    this.isState(this.state)
    this.setRoleManager();
    this.changeState();
  }

  async listEmployee(){
    this.manager.token = await this.getToken();
    this.employeeService.listEmployee(this.manager.token)
      .subscribe(response => {
        console.log(response.data);
        for(let employe of response.data){
          if(employe.role.nameRole == "employee"){
            employe.avatar = this.employee.convertBase64ToJpg(employe.avatar);
            this.listEmployes.push(employe);
          }
        }
      });  
  }

  async listBuildings(){
    let token = await this.getToken();
    this.buildingService.listBuilding(token)
      .subscribe(response => {
        console.log(response)
        this.buildings.push(...response.data);

      });
  }

  isState(state:string): boolean {
    return state == "Staff" ? true : false;
  }

  goToProfile(userName:string):void{
    const profile = "employee"
    this.router.navigate([`manager/${this.state}/${profile}/${userName}`]);
  }

  getState(){
    this.state =  this.activateRoute.snapshot.paramMap.get('value');
  }

  async setRoleManager(){
    this.manager.role = await this.getRole();
  }

  async getRole(): Promise<string>{
    const rol = await Storage.get({key: 'rol'});
    return rol.value;
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value;
  }

  changeState(){
    if(this.state == "Staff"){
      this.listEmployee();
    }
    else{
      this.listBuildings();
    }
  }

  goManager():void {
    this.router.navigate(['/manager']);
  }


  async goToBuildingDetail(buildingId:string, nameBuilding:string){
    let id:string = buildingId;
    console.log(buildingId);
    console.log(id);
    this.setBuildingId(id);
    this.router.navigate([`manager/${this.state}/${nameBuilding}`]);

  }

  async setBuildingId(valueBuilding:string){
    const building = await Storage.set({
      key: 'buildingId',
      value: valueBuilding
    });
  }

}
