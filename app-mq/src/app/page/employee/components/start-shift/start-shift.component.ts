import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-shift',
  templateUrl: './start-shift.component.html',
  styleUrls: ['./start-shift.component.scss'],
})
export class StartShiftComponent implements OnInit {

  @Input() weeklyHours: number;
  @Input() weeklyTotalHours: number;
  @Input() userName: string;
  @Input() rol: string;

  @Output() stateEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {}

  goCurrentWeek():void{
    const WEEK_CURRENT:string = "weekcurrent";
    this.router.navigate([`employee/${this.userName}/hours/${WEEK_CURRENT}`]);
  }

  goWeeklyTotalHours():void{
    const TOTAL:string = "total";
    this.router.navigate([`employee/${this.userName}/hours/${TOTAL}`]);
  }

  start():void {
    const STATE = true;
    this.stateEvent.emit(STATE);
  }


}
