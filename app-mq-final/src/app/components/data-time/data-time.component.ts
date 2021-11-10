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
  @Input() timeEmployee:Date = null;

  constructor() {
  }

  ngOnInit() {
    this.setTime();
  }

  setTime(){
    if(this.timeEmployee == null){
      this.time = new Date();
    }
    else{
      this.time = this.timeEmployee;
    }
  }
  
}
