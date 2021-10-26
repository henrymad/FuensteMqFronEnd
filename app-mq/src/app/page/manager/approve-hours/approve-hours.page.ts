import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailWeek } from 'src/app/class/utils';
import { Body, Week } from 'src/app/interface/interfaceService';
import { Storage } from '@capacitor/storage';
import { ApproveHoursService } from 'src/app/services/approve-hours.service';
import { Location } from '@angular/common'
import { AlertController } from '@ionic/angular';

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
  days: Array<string> = ["sunday","monday", "tuesday", "wednesday", "thusday", "friday", "satuday"];
  weekFirst: Array<Week> = [];
  weekSecond: Array<Week> = [];

  total = {
    monday:0,
    tuesday:0,
    wednesday:0,
    thursday:0,
    friday:0,
    saturday:0,
    sunday:0

  }

  total_1 = {
    monday:0,
    tuesday:0,
    wednesday:0,
    thursday:0,
    friday:0,
    saturday:0,
    sunday:0

  }

  constructor(
    private activateRoute: ActivatedRoute,
    private apporveService: ApproveHoursService,
    private location: Location,
    private alertController: AlertController
  
  ) { }

  ngOnInit() {
    this.getHoursService();    
  }

  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value;
  }

  setApprove(event, date:any){
    for(let item of this.weekFirst){
      if(date == item.date){
        item.approve = event.detail.value;
        if(item.approve =="N"){
          item.dayTotal = 0;
          this.sumTotalFirstTable();
          return;
        }
        else{
          item.dayTotal = item.hours;
          this.sumTotalFirstTable();
          return;
        }
      }
    }
  }

  setApproveSecond(event, date:any){
    for(let item of this.weekSecond){
      if(date == item.date){
        item.approve = event.detail.value;
        if(item.approve =="N"){
          item.dayTotal = 0;
          this.sumTotalSecondTable();
          return;
        }
        else{
          item.dayTotal = item.hours;
          this.sumTotalSecondTable();
          return;
        }
      }
   }
  }

  async getHoursService(){
    this.token = await this.getToken();
    let userName = this.getUser();
    this.apporveService.getTimeSpantApprovation(this.token,userName).subscribe(response => {
      console.log(response.data);
      if(response.status !== 200){
        this.errorServiceAlert();
        this.location.back();
      }
      if(response.data.body === null){
        this.emptyHoursAlert();
        this.location.back();
      }
      const [ObjectoUno, ObjectoDos] = response.data.body;
      if(ObjectoUno.length === 0 && ObjectoDos.length === 0){
        this.emptyHoursAlert();
        this.location.back();
      }

      this.requestHours.parameterId = ObjectoUno.parameterId;
      this.weekFirst.push({
        day: "Sun",
        hours: ObjectoUno.sunday,
        date: ObjectoUno.sundayDate,  
        dayTotal:0,
  
      },
    
      {
        day: "Mon",
        hours: ObjectoUno.monday,
        date: ObjectoUno.mondayDate,
        dayTotal:0,
        
      },
      {
        day: "Tue",
        hours: ObjectoUno.tuesday,
        date: ObjectoUno.tuesdayDate,
        dayTotal:0,
      },
      {
        day: "Wed",
        hours: ObjectoUno.wednesday,
        date: ObjectoUno.wednesdayDate,
        dayTotal:0,
      },
      {
        day: "Thu",
        hours: ObjectoUno.thursday,
        date: ObjectoUno.thursdayDate,
        dayTotal:0,
      },
      {
        day: "Fri",
        hours: ObjectoUno.friday,
        date: ObjectoUno.fridayDate,
        dayTotal:0,
      },
      {
        day: "Sat",
        hours: ObjectoUno.saturday,
        date: ObjectoUno.saturdayDate,
        dayTotal:0,
      });
      this.requestHours.listTimestampId = ObjectoUno.listTimestampId;
      this.requestHours.listTimestampId[0] = 1;  

      this.weekSecond.push({
        day: "Sun",
        hours: ObjectoDos.sunday,
        date: ObjectoDos.sundayDate,  
        dayTotal:0,
  
      },
      {
        day: "Mon",
        hours: ObjectoDos.monday,
        date: ObjectoDos.mondayDate,
        dayTotal:0,
        
      },
      {
        day: "Tue",
        hours: ObjectoDos.tuesday,
        date: ObjectoDos.tuesdayDate,
        dayTotal:0,
      },
      {
        day: "Wed",
        hours: ObjectoDos.wednesday,
        date: ObjectoDos.wednesdayDate,
        dayTotal:0,
      },
      {
        day: "Thu",
        hours: ObjectoDos.thursday,
        date:  ObjectoDos.thursdayDate,
        dayTotal:0,
      },
      {
        day: "Fri",
        hours: ObjectoDos.friday,
        date: ObjectoDos.fridayDate,
        dayTotal:0,
      },
      {
        day: "Sat",
        hours: ObjectoDos.saturday,
        date: ObjectoDos.saturdayDate,
        dayTotal:0,
      });

      this.requestSecondHours.listTimestampId = ObjectoDos.listTimestampId;
      this.requestSecondHours.listTimestampId[0] = 2;

      this.responseHours.push( ...response.data.body);
      this.hoursFirstTable.push(this.responseHours[0]);
      this.hoursSecondTable.push(this.responseHours[1]);

    });
  }

  sumTotalFirstTable(){
    this.sumFirstTable = this.totalHours(this.weekFirst);
    this.sumTotalHours();
  }


  sumTotalSecondTable(){
    this.sumSecondTable = this.totalHours(this.weekSecond);
    this.sumTotalHours();
  }

  sumTotalHours(){
    this.sumTotal = this.sumSecondTable + this.sumFirstTable;
  }

  setRequestHours(request:DetailWeek){
    request.sundayApprove = this.weekFirst[0].approve;
    request.mondayApprove = this.weekFirst[1].approve;
    request.tuesdayApprove = this.weekFirst[2].approve;
    request.wednesdayApprove = this.weekFirst[3].approve;
    request.thursdayApprove = this.weekFirst[4].approve;
    request.fridayApprove = this.weekFirst[5].approve;
    request.saturdayApprove = this.weekFirst[6].approve;
    return request;
  }

  postApproveHoursService(){
    if(this.isSelect(this.weekFirst, this.weekSecond)){
        this.approvedAlertFaild();
    }
    else{
      this.request[0] = this.setRequestHours(this.requestHours) ;
      this.request[1] = this.setRequestHours(this.requestSecondHours);
      console.log(this.request);
      let userName = this.getUser();
      this.apporveService.postApproveHours(this.token,this.request,userName).subscribe(response => {
      this.approveHoursdAlert();
      this.location.back();
    });
    } 
  }

  getUser(){
    return this.activateRoute.snapshot.paramMap.get('username');
  }

  isSelect(firstWeek:Week[], secondWeek:Week[]):boolean{
    for(let item of firstWeek){
      if(item.approve == undefined){
        return true;
      }
    }
    for(let item of secondWeek){
      if(item.approve == undefined){
        return true;
      }
    }
    return false;
  }

  totalHours(week:Array<Week>):number{
    let suma = 0;
    week.forEach(item => {
      suma+=item.dayTotal;
    });
    return suma;
  }

  async approvedAlertFaild() {
    const alert = await this.alertController.create({
      header: 'Approve Hours failed',
      mode:"ios",
      message: 'Some day remains to be approved, verify!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async approveHoursdAlert() {
    const alert = await this.alertController.create({
      header: 'Saved Successfully!',
      mode:"ios",
      message: 'Success approved hours!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async emptyHoursAlert() {
    const alert = await this.alertController.create({
      header: 'There are not Hours',
      mode:"ios",
      message: "This user doesn't have hours!",
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorServiceAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      mode:"ios",
      message: "Sorry, the approved hour service is failing, try later!",
      buttons: ['OK']
    });

    await alert.present();
  }

}
