import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClockOutDTO, ResponseClocOut, ResponseEvent } from 'src/app/class/utils';
import { Geolocation } from '@capacitor/geolocation';
import { ClockOutService } from 'src/app/services/clock-out.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'clock-out',
  templateUrl: './clock-out.component.html',
  styleUrls: ['./clock-out.component.scss'],
})
export class ClockOutComponent implements OnInit {

  @Output() stateEvent = new EventEmitter<ResponseClocOut>();
  @Input() data: ResponseEvent = new ResponseEvent();
  @Input() token:string;

  dataCLockout: ClockOutDTO = new ClockOutDTO();
  response: ResponseClocOut = new ResponseClocOut();

  nameBuilding:string;
  
  constructor(private clockoutService: ClockOutService) { }

  ngOnInit() {
    this.setBuilding();
  }

  async setBuilding(){
    const state = await this.getState();
    const dataMemory:string = await this.getData();
    console.log(dataMemory);
    if(state == "start" ){
      const data:ResponseEvent = JSON.parse(dataMemory);
      console.log(data);
      this.nameBuilding = data.nameBuilding;
    }
    else{
      this.nameBuilding = this.data.nameBuilding;
    }
  }
  async endShift(){
    await this.setData(); 
  }

  async setData():Promise<void> {
    const state = await this.getState();
    const dataMemory:string = await this.getData();
    if(state == "start"){
      const data:ResponseEvent = JSON.parse(dataMemory);
      const coordinates = await Geolocation.getCurrentPosition();
      this.dataCLockout.username = data.responseDTO.username;
      this.dataCLockout.buildingid = data.responseDTO.buildingid;
      this.dataCLockout.dateStartShift = data.responseDTO.dateStartShift;
      this.dataCLockout.latitudeStartShift = data.responseDTO.latitudeStartShift;
      this.dataCLockout.longitudeStartShift = data.responseDTO.longitudeStartShift;
      this.dataCLockout.dateEndShift = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
      this.dataCLockout.latitudeEndShift = coordinates.coords.latitude.toString(); 
      this.dataCLockout.longitudeEndShift = coordinates.coords.longitude.toString(); 
      this.dataCLockout.timestampId = data.timestampId;
      this.clockoutService.clockOut(this.dataCLockout, this.token)
      .subscribe(res => {
        console.log(res);
        this.response.data = res.data.hours;
        this.response.state = true;
        this.setState("end");
        console.log(this.response.data);
        this.stateEvent.emit(this.response);
      });
    }
    else{
      const coordinates = await Geolocation.getCurrentPosition();
      this.dataCLockout.username = this.data.responseDTO.username;
      this.dataCLockout.buildingid = this.data.responseDTO.buildingid;
      this.dataCLockout.dateStartShift = this.data.responseDTO.dateStartShift;
      this.dataCLockout.latitudeStartShift = this.data.responseDTO.latitudeStartShift;
      this.dataCLockout.longitudeStartShift = this.data.responseDTO.longitudeStartShift;
      this.dataCLockout.dateEndShift = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
      this.dataCLockout.latitudeEndShift = coordinates.coords.latitude.toString(); 
      this.dataCLockout.longitudeEndShift = coordinates.coords.longitude.toString(); 
      this.dataCLockout.timestampId = this.data.timestampId;
      console.log(this.dataCLockout);
      this.clockoutService.clockOut(this.dataCLockout, this.token)
        .subscribe(res => {
          console.log(res);
          this.setState("end");
          this.response.data = res.data.hours;
          this.response.state = true;
          console.log(this.response.data);
          this.stateEvent.emit(this.response);
        });
    }
   
  }


  async getState(): Promise<string>{
    const state = await Storage.get({key: 'state'});
    return state.value;
  }
  
  async getData(): Promise<string>{
    const data = await Storage.get({key: 'data'});
    return data.value;
  }

  async setState(valueState:string){
    const state = await Storage.set({
      key: 'state',
      value: valueState
    });
  }
}
