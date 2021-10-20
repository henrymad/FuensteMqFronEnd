import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/class/utils';
import { EmployeeService } from 'src/app/services/employee.service';
import { Storage } from '@capacitor/storage';

declare var google;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  employee: Employee = new Employee();

  myLatLngStart = {
    lat: 0,
    lng: 0
  }

  myLatLngEnd = {
    lat: 0,
    lng: 0
  }

  constructor(  private activateRoute: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.setLocation();
  }

  async setLocation(){
    this.employee.token = await this.getToken();
    this.employee.userName = this.getUserName();
    this.employeeService.getLocationEmployee(this.employee.token, this.employee.userName)
      .subscribe(res => {
        console.log(res.data);
        this.myLatLngStart.lat = res.data.body.latitudeStartShift;
        this.myLatLngStart.lng = res.data.body.longitudeStartShift;
        this.myLatLngEnd.lat = res.data.body.latitudeEndShift;
        this.myLatLngEnd.lng = res.data.body.longitudeEndShift
        this.loadMapStart();
        this.loadMapEnd();
      });
  }

  async loadMapStart() {
    const mapEle: HTMLElement = document.getElementById('start');
    const map = new google.maps.Map(mapEle, {
      center: this.myLatLngStart,
      zoom: 12
    });
    const marker = new google.maps.Marker({
      position: { lat: this.myLatLngStart.lat, lng: this.myLatLngStart.lng },
      map: map,
      title: 'Hello World!'
    });
  }

  async loadMapEnd() {
    const mapEle: HTMLElement = document.getElementById('end');
    const map = new google.maps.Map(mapEle, {
      center: this.myLatLngEnd,
      zoom: 12
    });
    const marker = new google.maps.Marker({
      position: { lat: this.myLatLngEnd.lat, lng: this.myLatLngEnd.lng },
      map: map,
      title: 'Hello World!'
    });
  }

  getUserName():string{
    return this.activateRoute.snapshot.paramMap.get('username');
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }

}
