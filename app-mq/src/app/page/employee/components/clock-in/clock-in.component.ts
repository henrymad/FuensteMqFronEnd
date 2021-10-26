import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Building,ResponseEvent} from 'src/app/class/utils';
import { BuildingService } from 'src/app/services/building.service';
import { ClockInService } from 'src/app/services/clock-in.service';

import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss'],
})
export class ClockInComponent implements OnInit {

  @Output() dataEvent = new EventEmitter<ResponseEvent>();
  @Input() token:string;
  @Input() userName: string;
  data: ResponseEvent = new ResponseEvent(); 
  building: Building = new Building();
  buildingSelect:any;

  constructor(
    private buildingService: BuildingService,
    private clockInService: ClockInService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.getBuildingList();
  }

  getBuildingList(){
    this.buildingService.getListBuildings(this.token, this.userName)
      .subscribe(res => {
        this.building.listBuilding.push(...res.data);
      })
  }

  setIdBuilding(){
    this.data.responseDTO.buildingid = this.buildingSelect.buildingId;
    this.data.nameBuilding = this.buildingSelect.nameBuilding;
  }

  async startShift(){
    if(this.data.responseDTO.buildingid !=null && this.data.responseDTO.buildingid != undefined ){
      await this.setData();
    }
    else {
      this.presentAlert();
    }  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode:"ios",
      header: 'Start shift failed',
      message: 'Failed to start shift, choose your building and try again',
      buttons: ['OK']
    });
    await alert.present();
  }

  async setData(): Promise<void>{
    const coordinates = await Geolocation.getCurrentPosition();
    this.data.responseDTO.username = this.userName;
    this.data.responseDTO.dateStartShift = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
    console.log(this.data.responseDTO.dateStartShift);
    this.data.responseDTO.latitudeStartShift = coordinates.coords.latitude.toString();
    this.data.responseDTO.longitudeStartShift = coordinates.coords.longitude.toString();
    console.log(this.data.responseDTO);
    this.clockInService.clockIn(this.data.responseDTO, this.token)
      .subscribe(response => {
        const STATE:string = "true";
        this.setState(STATE);
        this.data.timestampId = response.data.timestampId;
        this.data.status = true;
        this.dataEvent.emit(this.data);
      }); 
  }

  async setState(valueState:string){
    const state = await Storage.set({
      key: 'state',
      value: valueState
    });
  }
}
