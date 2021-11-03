import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-time',
  templateUrl: './data-time.component.html',
  styleUrls: ['./data-time.component.scss'],
})
export class DataTimeComponent implements OnInit {

  time: Date;
  @Input() colorText:string;
  @Input() fontSize:string;
  @Input() lineHeight:string;

  constructor() {
    this.time = new Date();
  }

  ngOnInit() {}

}
