import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Employee } from 'src/app/class/utils';
import { BuildingService } from 'src/app/services/building.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-staff-building',
  templateUrl: './staff-building.page.html',
  styleUrls: ['./staff-building.page.scss'],
})
export class StaffBuildingPage implements OnInit{

  admin: Employee = new Employee();

  employees: any[] = [];
  listEmployee: any[] = [];
  buildings: Array<any> = [];


  state:string;
  
  constructor(
    private actionSheetController: ActionSheetController,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private buildingService: BuildingService) { }

  ngOnInit() {
    this.getState(); 
    this.isState(this.state)
    this.changeState();
  }

  trackByFn = (index, item) => item.id;

  async list(){
    this.admin.token = await this.getToken();
    this.employeeService.listEmployee(this.admin.token)
      .subscribe(response => {
        console.log(response);
        for(let employee of response.data){
          employee.avatar = this.admin.convertBase64ToJpg(employee.avatar)
          this.employees.push(employee);
          this.listEmployee.push(employee);
        }
      })
  }

  async listBuildings(){
    let token = await this.getToken();
    this.buildingService.listBuilding(token)
      .subscribe(response => {
        console.log(response)
        this.buildings.push(...response.data);

      });
  }

  async selectEmployee(){
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [
        { 
          text: 'Employee',
          role: 'employee',
          handler: () => {
            this.employees = this.listEmployee;
            this.employees = this.employees.filter(employee => employee.role.nameRole == "employee");
          }
        },
        { text: 'Manager',
          role: 'manager',
          handler: () => {
            this.employees = this.listEmployee;
            this.employees = this.employees.filter(employee => employee.role.nameRole == "manager");
          } 
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
  }

  isState(state:string): boolean {
    return state == "Staff" ? true : false;
  }

  changeState(){
    if(this.state == "Staff"){
      this.list();
    }
    else{
      this.listBuildings();
    }
  }

  goToStaff(role:string, userName:string):void{
    this.router.navigate([`admin/${this.state}/${role}/${userName}`]);
  }

  async goToBuildingDetail(buildingId:string, nameBuilding:string){
    this.setBuildingId(""+buildingId);;
    this.router.navigate([`admin/${this.state}/${nameBuilding}`])

  }

  getState(){
    this.state =  this.activateRoute.snapshot.paramMap.get('value');
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value;
  }

  async setBuildingId(valueBuilding:string){
    const building = await Storage.set({
      key: 'buildingId',
      value: valueBuilding
    });
  }

  

}
