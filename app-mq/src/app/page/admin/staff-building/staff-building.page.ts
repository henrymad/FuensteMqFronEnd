import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-staff-building',
  templateUrl: './staff-building.page.html',
  styleUrls: ['./staff-building.page.scss'],
})
export class StaffBuildingPage implements OnInit {

  profiles:number[] = [1,2,3,4,5,6];
  state:string;

  id:string;
  token:string;
  

  constructor(
    private actionSheetController: ActionSheetController,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
   this.getState(); 
    this.isState(this.state)
  }

  async prueba() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [
        { text: 'Employee' },
        { text: 'Manager' },
        { text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  isState(state:string): boolean {
    return state == "Staff" ? true : false;
  }

  backProfile(){
    this.router.navigate([`/admin/${this.id}/${this.token}`])
  }

  goToStaff():void{
    let userName:string = "2";
    this.router.navigate([`admin/${this.state}/employee-profile/${userName}`]);
  }

  getState(){
    this.state =  this.activateRoute.snapshot.paramMap.get('value');
  }

}
