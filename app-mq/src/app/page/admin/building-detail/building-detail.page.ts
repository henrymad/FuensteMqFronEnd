import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { Storage } from '@capacitor/storage';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.page.html',
  styleUrls: ['./building-detail.page.scss'],
})
export class BuildingDetailPage implements OnInit {

  manager: Employee = new Employee();
  listEmployee: Array<any> = [];
  state:string;
  isActive:boolean = true;

  nameBuilding:string;

  constructor(  
    private activateRoute: ActivatedRoute,
    private router: Router,
    private buildingService: BuildingService) { }

  ngOnInit() {
    this.getNameBuilding();
    this.getBuildingEmployee();
    this.getState();
  }

  async getBuildingEmployee(){
    let idBuilding = await this.getBuildingId();
    let token = await this.getToken();
    this.buildingService.getEmployeeBuilding(token, idBuilding)
      .subscribe(result => {
        console.log(result.data);
        const {employees, manager} = result.data;
        this.manager.firstName = manager.firstName;
        this.manager.lastName = manager.lastname;
        this.manager.role = manager.role;
        this.manager.userName = manager.username
        this.listEmployee.push(...employees);
        if(employees.length === 0){
          this.isActive = false;
          this.listEmployee.push(1);
        }
        console.log(manager);
        console.log(this.listEmployee);
      })

  }

  getNameBuilding(){
    this.nameBuilding =  this.activateRoute.snapshot.paramMap.get('namebuilding');
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value;
  }

  async getBuildingId(): Promise<string>{
    const id = await Storage.get({key: 'buildingId'});
    return id.value;
  }


  goToProfileEmployee(userName:string, profile:string):void{
    this.router.navigate([`admin/${this.state}/${this.nameBuilding}/${profile}/${userName}`]);
  }

  goToProfileManager(){
    this.router.navigate([`admin/${this.state}/${this.nameBuilding}/${this.manager.role}/${this.manager.userName}`]);
  }

  getState(){
    this.state =  this.activateRoute.snapshot.paramMap.get('value');
  }

}
