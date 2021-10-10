import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClockOutDTO, ResponseEvent } from 'src/app/class/employee';
import { Geolocation } from '@capacitor/geolocation';
import { ClockOutService } from 'src/app/services/clock-out.service';

@Component({
  selector: 'clock-out',
  templateUrl: './clock-out.component.html',
  styleUrls: ['./clock-out.component.scss'],
})
export class ClockOutComponent implements OnInit {

  @Output() stateEvent = new EventEmitter<boolean>();
  @Input() data: ResponseEvent = new ResponseEvent();
  @Input() token:string;

  dataCLockout: ClockOutDTO = new ClockOutDTO();
  
  constructor(private clockoutService: ClockOutService) { }

  ngOnInit() {
    this.setBuilding();
  }

  setBuilding(){
    this.data.nameBuilding;
  }

  async endShift(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.dataCLockout.username = this.data.responseDTO.username;
    this.dataCLockout.buildingid = this.data.responseDTO.buildingid;
    this.dataCLockout.dateStartShift = this.data.responseDTO.dateStartShift;
    this.dataCLockout.latitudeStartShift = this.data.responseDTO.latitudeStartShift;
    this.dataCLockout.longitudeStartShift = this.data.responseDTO.longitudeStartShift;
    this.dataCLockout.dateEndShift = this.getDateEnd();
    this.dataCLockout.latitudeEndShift = coordinates.coords.latitude.toString(); 
    this.dataCLockout.longitudeEndShift = coordinates.coords.longitude.toString(); 
    this.dataCLockout.timestampId = this.data.timestampId;
    this.clockoutService.clockOut(this.dataCLockout, this.token)
      .subscribe(response => console.log(response));
    const STATE = true;
    this.stateEvent.emit(STATE);
  }

  getDateEnd():string{
    const now = new Date();
    return now.toISOString();
  }

}
