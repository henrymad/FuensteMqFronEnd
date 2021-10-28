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
  request: DetailWeek[] = [];
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
      this.requestHours.listTimestampId = ObjectoUno.listTimestampId;
      this.requestHours.listTimestampId[0] = 1;
      this.requestHours.iteration = ObjectoUno.iteration;
      this.weekFirst.push({
        day: "Sun",
        hours: ObjectoUno.sunday,
        date: ObjectoUno.sundayDate,  
        dayTotal:0,
        listBuilding: ObjectoUno.sundaylistBuilding
      },
    
      {
        day: "Mon",
        hours: ObjectoUno.monday,
        date: ObjectoUno.mondayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.mondaylistBuilding
        
      },
      {
        day: "Tue",
        hours: ObjectoUno.tuesday,
        date: ObjectoUno.tuesdayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.tuesdaylistBuilding
      },
      {
        day: "Wed",
        hours: ObjectoUno.wednesday,
        date: ObjectoUno.wednesdayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.wednesdayListBuilding
      },
      {
        day: "Thu",
        hours: ObjectoUno.thursday,
        date: ObjectoUno.thursdayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.thursdayListBuilding
        
      },
      {
        day: "Fri",
        hours: ObjectoUno.friday,
        date: ObjectoUno.fridayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.fridayListBuilding
      },
      {
        day: "Sat",
        hours: ObjectoUno.saturday,
        date: ObjectoUno.saturdayDate,
        dayTotal:0,
        listBuilding: ObjectoUno.saturdayListBuilding
      });
      
  
      this.weekSecond.push({
        day: "Sun",
        hours: ObjectoDos.sunday,
        date: ObjectoDos.sundayDate,  
        dayTotal:0,
        listBuilding: ObjectoDos.sundayListBuilding
      },
      {
        day: "Mon",
        hours: ObjectoDos.monday,
        date: ObjectoDos.mondayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.mondayListBuilding
        
      },
      {
        day: "Tue",
        hours: ObjectoDos.tuesday,
        date: ObjectoDos.tuesdayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.tuesdayListBuilding
      },
      {
        day: "Wed",
        hours: ObjectoDos.wednesday,
        date: ObjectoDos.wednesdayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.wednesdayListBuilding
      },
      {
        day: "Thu",
        hours: ObjectoDos.thursday,
        date:  ObjectoDos.thursdayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.thursdayListBuilding
      },
      {
        day: "Fri",
        hours: ObjectoDos.friday,
        date: ObjectoDos.fridayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.friidayListBuilding
      },
      {
        day: "Sat",
        hours: ObjectoDos.saturday,
        date: ObjectoDos.saturdayDate,
        dayTotal:0,
        listBuilding: ObjectoDos.saturdayListBuilding
      });

      console.log(this.weekFirst[0].listBuilding);

      this.requestSecondHours.parameterId = ObjectoDos.parameterId;
      this.requestSecondHours.listTimestampId = ObjectoDos.listTimestampId;
      this.requestSecondHours.listTimestampId[0] = 2;
      this.requestSecondHours.iteration = ObjectoDos.iteration;
      
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

  setRequestHours(request:DetailWeek, week:Week[]):DetailWeek{

    request.sunday = week[0].hours;
    request.monday = week[1].hours;
    request.tuesday = week[2].hours;
    request.wednesday = week[3].hours;
    request.thursday = week[4].hours;
    request.friday = week[5].hours;
    request.saturday = week[6].hours;
  
    request.sundayDate = week[0].date;
    request.mondayDate = week[1].date;
    request.tuesdayDate = week[2].date;
    request.wednesdayDate = week[3].date;
    request.thursdayDate = week[4].date;
    request.fridayDate = week[5].date;
    request.saturdayDate = week[6].date;

    request.sundayApprove = week[0].approve;
    request.mondayApprove = week[1].approve;
    request.tuesdayApprove = week[2].approve;
    request.wednesdayApprove = week[3].approve;
    request.thursdayApprove = week[4].approve;
    request.fridayApprove = week[5].approve;
    request.saturdayApprove = week[6].approve;

    request.sundayListBuilding = week[0].listBuilding;
    request.mondayListBuilding = week[1].listBuilding;
    request.tuesdayListBuilding = week[2].listBuilding;
    request.wednesdayListBuilding = week[3].listBuilding;
    request.thursdayListBuilding = week[4].listBuilding;
    request.fridayListBuilding = week[5].listBuilding;;
    request.saturdayListBuilding = week[6].listBuilding;

    return request;
  }

  postApproveHoursService(){
    if(this.isSelect(this.weekFirst, this.weekSecond)){
        this.approvedAlertFaild();
    }
    else{
      this.request[0] = this.setRequestHours(this.requestHours, this.weekFirst) ;
      this.request[1] = this.setRequestHours(this.requestSecondHours, this.weekSecond);
      console.log(this.request[0].sundayListBuilding);
      console.log(this.request);
      let userName = this.getUser();
      this.apporveService.postApproveHours(this.token,this.request,userName).subscribe(response => {
        console.log(response);
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
