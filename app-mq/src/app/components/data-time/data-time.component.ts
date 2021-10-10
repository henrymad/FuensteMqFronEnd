import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-time',
  templateUrl: './data-time.component.html',
  styleUrls: ['./data-time.component.scss'],
})
export class DataTimeComponent implements OnInit {

  @Input() week: string;
  @Input() date: string; 
  @Input() time: string;
  @Input() colorText:string;
  @Input() fontSize:string;
  @Input() lineHeight:string; 

  constructor() { }

  ngOnInit() {}

}
