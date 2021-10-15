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

  myLatLng = {
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
        console.log(res.data.body.latitudeStartShift);
        this.myLatLng.lat = res.data.body.latitudeStartShift;
        this.myLatLng.lng = res.data.body.longitudeStartShift;
        this.loadMap();
      });
  }

  async loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });
    const marker = new google.maps.Marker({
      position: { lat: this.myLatLng.lat, lng: this.myLatLng.lng },
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