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
  @Input() week: number;
  @Input() userName: string;
  @Input() rol: string;

  @Output() stateEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {}

  goCurrentWeek():void{
    this.router.navigate(['employee/2/hours']);
  }

  goWeeklyTotalHours():void{
    this.router.navigate(['employee/2/hours']);
  }

  start():void {
    const STATE = true;
    this.stateEvent.emit(STATE);
  }


}
