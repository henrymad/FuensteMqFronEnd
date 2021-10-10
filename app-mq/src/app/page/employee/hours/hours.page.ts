import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.page.html',
  styleUrls: ['./hours.page.scss'],
})
export class HoursPage implements OnInit {

  days: Array<string> = ["MONDEY", "TUESDAY", "WENESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  date: Array<string> = ["09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021"];
  hours: Array<number> = [1,2,3,4,5,6,7];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  back():void {
    this.route.navigate(['employee/2']);
  }

}
