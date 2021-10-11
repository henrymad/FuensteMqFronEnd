import { Component, Input, OnInit } from '@angular/core';
import { DetailWeek } from 'src/app/class/employee';

@Component({
  selector: 'table-hours',
  templateUrl: './table-hours.component.html',
  styleUrls: ['./table-hours.component.scss'],
})
export class TableHoursComponent implements OnInit {

  @Input() weeksDetail: DetailWeek = new DetailWeek();
  day:string;
  
  days: Array<string> = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  dates: Array<string> = ["09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021", "09-10-2021"];
  hours: Array<number> = [1,2,3,4,5,6,7];

  constructor() { }

  ngOnInit() {
    
  }





  

}
