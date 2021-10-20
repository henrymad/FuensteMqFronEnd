import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailWeek } from 'src/app/class/utils';
import { Body } from 'src/app/interface/interfaceService';
import { Storage } from '@capacitor/storage';
import { ApproveHoursService } from 'src/app/services/approve-hours.service';

@Component({
  selector: 'app-approve-hours',
  templateUrl: './approve-hours.page.html',
  styleUrls: ['./approve-hours.page.scss'],
})
export class ApproveHoursPage implements OnInit {

  token:string;
  responseHours: Body[] = [];
  hoursFirstTable: Body[] = [];
  hoursSecondTable: Body[] = [];
  requestHours: DetailWeek = new DetailWeek();
  requestSecondHours: DetailWeek = new DetailWeek();
  request: any[] = [];
  sumFirstTable: number=0;
  sumSecondTable: number=0;
  sumTotal: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private apporveService: ApproveHoursService
  
  ) { }

  ngOnInit() {
    //this.token = this.activateRoute.snapshot.paramMap.get('token');
    this.getHoursService();
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value;
  }

  setApprove(event, date:any){
    console.log(event.detail.value);
    if(date===this.requestHours.sundayDate){
      this.requestHours.sundayApprove = event.detail.value;
      if(this.requestHours.sundayApprove="Y"){
        this.sumHours(this.requestHours.sunday);
      }
    }
    if(date===this.requestHours.mondayDate){
      this.requestHours.mondayApprove = event.detail.value;
      if(this.requestHours.mondayApprove="Y"){
        this.sumHours(this.requestHours.monday);
      }
    }
    if(date===this.requestHours.tuesdayDate){
      this.requestHours.tuesdayApprove = event.detail.value;
      if(this.requestHours.tuesdayApprove="Y"){
        this.sumHours(this.requestHours.tuesday);
      }
    }
    if(date===this.requestHours.wednesdayDate){
      this.requestHours.wednesdayApprove = event.detail.value;
      if(this.requestHours.wednesdayApprove="Y"){
        this.sumHours(this.requestHours.wednesday);
      }
    }
    if(date===this.requestHours.thursdayDate){
      this.requestHours.thursdayApprove =  event.detail.value;
      if(this.requestHours.thursdayApprove="Y"){
        this.sumHours(this.requestHours.thursday);
      }
    }
    if(date===this.requestHours.fridayDate){
      this.requestHours.fridayApprove = event.detail.value;
      if(this.requestHours.fridayApprove="Y"){
        this.sumHours(this.requestHours.friday);
      }
    }
    if(date===this.requestHours.saturdayDate){
      this.requestHours.saturdayApprove = event.detail.value;
      if(this.requestHours.saturdayApprove="Y"){
        this.sumHours(this.requestHours.saturday);
      }
    }

  }

  setApproveSecond(event, date:any){
    console.log(event.detail.value);
    if(date===this.requestSecondHours.sundayDate){
      this.requestSecondHours.sundayApprove = event.detail.value;
      if(this.requestSecondHours.sundayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.sunday);
      }
    }
    if(date===this.requestSecondHours.mondayDate){
      this.requestSecondHours.mondayApprove = event.detail.value;
      if(this.requestSecondHours.mondayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.monday);
      }
    }
    if(date===this.requestSecondHours.tuesdayDate){
      this.requestSecondHours.tuesdayApprove = event.detail.value;
      if(this.requestSecondHours.tuesdayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.tuesday);
      }
    }
    if(date===this.requestSecondHours.wednesdayDate){
      this.requestSecondHours.wednesdayApprove = event.detail.value;
      if(this.requestSecondHours.wednesdayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.wednesday);
      }
    }
    if(date===this.requestSecondHours.thursdayDate){
      this.requestSecondHours.thursdayApprove =  event.detail.value;
      if(this.requestSecondHours.thursdayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.thursday);
      }
    }
    if(date===this.requestSecondHours.fridayDate){
      this.requestSecondHours.fridayApprove = event.detail.value;
      if(this.requestSecondHours.fridayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.friday);
      }
    }
    if(date===this.requestSecondHours.saturdayDate){
      this.requestSecondHours.saturdayApprove = event.detail.value;
      if(this.requestSecondHours.saturdayApprove="Y"){
        this.sumHoursSecond(this.requestSecondHours.saturday);
      }
    }

  }


  async getHoursService(){
    this.token = await this.getToken();
    this.apporveService.getTimeSpantApprovation(this.token,1).subscribe(response => {
      console.log(response.data);
      const [ObjectoUno, ObjectoDos] = response.data.body;
      console.log(ObjectoUno.sundayDate);
      console.log(response);

      this.requestHours.parameterId = ObjectoUno.parameterId;
      this.requestHours.monday = ObjectoUno.monday;
      this.requestHours.mondayDate = ObjectoUno.mondayDate;
      this.requestHours.tuesday = ObjectoUno.tuesday;
      this.requestHours.tuesdayDate = ObjectoUno.tuesdayDate;
      this.requestHours.wednesday = ObjectoUno.wednesday;
      this.requestHours.wednesdayDate = ObjectoUno.wednesdayDate;
      this.requestHours.thursday = ObjectoUno.thursday;
      this.requestHours.thursdayDate = ObjectoUno.thursdayDate;
      this.requestHours.friday = ObjectoUno.friday;
      this.requestHours.fridayDate = ObjectoUno.fridayDate;
      this.requestHours.saturday = ObjectoUno.saturday;
      this.requestHours.saturdayDate = ObjectoUno.saturdayDate;
      this.requestHours.sunday = ObjectoUno.sunday;
      this.requestHours.sundayDate = ObjectoUno.sundayDate;
      this.requestHours.listTimestampId = ObjectoUno.listTimestampId;
      this.requestHours.listTimestampId[0] = 1;

      this.requestSecondHours.parameterId = ObjectoDos.parameterId;
      this.requestSecondHours.monday = ObjectoDos.monday;
      this.requestSecondHours.mondayDate = ObjectoDos.mondayDate;
      this.requestSecondHours.tuesday = ObjectoDos.tuesday;
      this.requestSecondHours.tuesdayDate = ObjectoDos.tuesdayDate;
      this.requestSecondHours.wednesday = ObjectoDos.wednesday;
      this.requestSecondHours.wednesdayDate = ObjectoDos.wednesdayDate;
      this.requestSecondHours.thursday = ObjectoDos.thursday;
      this.requestSecondHours.thursdayDate = ObjectoDos.thursdayDate;
      this.requestSecondHours.friday = ObjectoDos.friday;
      this.requestSecondHours.fridayDate = ObjectoDos.fridayDate;
      this.requestSecondHours.saturday = ObjectoDos.saturday;
      this.requestSecondHours.saturdayDate = ObjectoDos.saturdayDate;
      this.requestSecondHours.sunday = ObjectoDos.sunday;
      this.requestSecondHours.sundayDate = ObjectoDos.sundayDate;
      this.requestSecondHours.listTimestampId = ObjectoDos.listTimestampId;
      this.requestSecondHours.listTimestampId[0] = 2;

      this.responseHours.push( ...response.data.body);
      this.hoursFirstTable.push(this.responseHours[0]);
      this.hoursSecondTable.push(this.responseHours[1]);

    });
  }

  sumHours(number:number){
    this.sumFirstTable = this.sumFirstTable + number;
    this.sumTotalHours(this.sumFirstTable);
  }

  sumHoursSecond(number:number){
    this.sumSecondTable = this.sumSecondTable + number;
    this.sumTotalHours(this.sumSecondTable);
  }

  sumTotalHours(total:number){
    this.sumTotal = this.sumTotal + total;
  }

  postApproveHoursService(){
    console.log("entra");
    this.request[0] = this.requestHours;
    this.request[1] = this.requestSecondHours;
    console.log(this.request);
    this.apporveService.postApproveHours(this.token,this.request,1).subscribe(response => {
      console.log(response);
    });    
  }

}
