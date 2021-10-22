import { Component, Input, OnInit } from '@angular/core';
import { DetailWeek } from 'src/app/class/utils';

@Component({
  selector: 'table-hours',
  templateUrl: './table-hours.component.html',
  styleUrls: ['./table-hours.component.scss'],
})
export class TableHoursComponent implements OnInit {

  @Input() weeksDetail: DetailWeek = new DetailWeek();
  day:string;
  
  days: Array<string> = ["SUNDAY","MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  constructor() { }

  ngOnInit() {
    
  }





  

}
