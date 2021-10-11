import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hours',
  templateUrl: './total-hours.component.html',
  styleUrls: ['./total-hours.component.scss'],
})
export class HoursComponent implements OnInit {

  @Input() hours:number;

  constructor() { }

  ngOnInit() {}

}
