import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'total-hours',
  templateUrl: './total-hours.component.html',
  styleUrls: ['./total-hours.component.scss'],
})
export class TotalHoursComponent implements OnInit {

  @Input() hours: number = 0;

  constructor() { }

  ngOnInit() {}

}
