import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

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

  constructor(
      private router: Router) { }

  ngOnInit() {
    this.lastState();
  }

  goCurrentWeek():void{
    const WEEK_CURRENT:string = "weekcurrent";
    this.router.navigate([`employee/${this.userName}/hours/${WEEK_CURRENT}`]);
  }

  goWeeklyTotalHours():void{
    const TOTAL:string = "total";
    this.router.navigate([`employee/${this.userName}/hours/${TOTAL}`]);
  }

  async lastState() {
    const state = await this.getState();
    if(state == "start"){
      this.stateEvent.emit(false);
    }
  }

  async getState(): Promise<string>{
    const state = await Storage.get({key: 'state'});
    return state.value;
  }

  start():void {
    const STATE:string = "true";
    this.setState(STATE);
    this.stateEvent.emit(true);
  }

  async setState(valueState:string){
    const state = await Storage.set({
      key: 'state',
      value: valueState
    });
  }

  


}
