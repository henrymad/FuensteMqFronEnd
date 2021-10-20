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

  nameBuilding:string;

  constructor(  
    private activateRoute: ActivatedRoute,
    private router: Router,
    private buildingService: BuildingService) { }

  ngOnInit() {
    this.getNameBuilding();
    this.getBuildingEmployee();
  }

  async getBuildingEmployee(){
    let idBuilding = await this.getBuildingId();
    let token = await this.getToken();
    this.buildingService.getEmployeeBuilding(token, idBuilding)
      .subscribe(result => {
        const {employees, manager} = result.data;
        this.manager.firstName = manager.name;
        this.manager.lastName = manager.lastname;
        this.listEmployee.push(...employees);
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

}
