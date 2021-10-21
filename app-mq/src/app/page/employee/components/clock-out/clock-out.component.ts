import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClockOutDTO, ResponseClocOut, ResponseEvent } from 'src/app/class/utils';
import { Geolocation } from '@capacitor/geolocation';
import { ClockOutService } from 'src/app/services/clock-out.service';

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
  
  constructor(private clockoutService: ClockOutService) { }

  ngOnInit() {
    this.setBuilding();
  }

  setBuilding(){
    this.data.nameBuilding;
  }

  async endShift(){
    await this.setData();
    
  }

  async setData():Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();
    this.dataCLockout.username = this.data.responseDTO.username;
    this.dataCLockout.buildingid = 1;
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
        this.response.data = res.data;
        this.response.state = true;
        console.log(this.response.data);
        this.stateEvent.emit(this.response);
      });
  }

}
