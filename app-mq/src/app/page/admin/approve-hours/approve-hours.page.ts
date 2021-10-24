import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailWeek } from 'src/app/class/utils';
import { Body } from 'src/app/interface/interfaceService';
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
    console.log(event.detail.value);
    if(date===this.requestHours.sundayDate){
      this.requestHours.sundayApprove = event.detail.value;
      if(this.requestHours.sundayApprove =="N"){
        this.total_1.sunday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.sunday = this.requestHours.sunday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.mondayDate){
      this.requestHours.mondayApprove = event.detail.value;
      if(this.requestHours.mondayApprove="N"){
        this.total_1.monday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.monday = this.requestHours.monday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.tuesdayDate){
      this.requestHours.tuesdayApprove = event.detail.value;
      if(this.requestHours.tuesdayApprove=="N"){
        this.total_1.tuesday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.tuesday = this.requestHours.tuesday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.wednesdayDate){
      this.requestHours.wednesdayApprove = event.detail.value;
      if(this.requestHours.wednesdayApprove=="N"){
        this.total_1.wednesday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.wednesday = this.requestHours.wednesday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.thursdayDate){
      this.requestHours.thursdayApprove =  event.detail.value;
      if(this.requestHours.thursdayApprove=="N"){
        this.total_1.thursday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.thursday = this.requestHours.thursday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.fridayDate){
      this.requestHours.fridayApprove = event.detail.value;
      if(this.requestHours.fridayApprove=="N"){
        this.total_1.friday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.friday = this.requestHours.friday;
        this.sumTotalFirstTable();
      }
    }
    if(date===this.requestHours.saturdayDate){
      this.requestHours.saturdayApprove = event.detail.value;
      if(this.requestHours.saturdayApprove=="N"){
        this.total_1.saturday = 0;
        this.sumTotalFirstTable();
      }
      else{
        this.total_1.saturday = this.requestHours.saturday;
        this.sumTotalFirstTable();
      }
    }

  }

  setApproveSecond(event, date:any){
    console.log(event.detail.value);
    if(date===this.requestSecondHours.sundayDate){
      this.requestSecondHours.sundayApprove = event.detail.value;
      if(this.requestSecondHours.sundayApprove=="Y"){
        this.total.sunday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.sunday = this.requestSecondHours.sunday;
        this.sumTotalSecondTable();
      }
    }
    if(date===this.requestSecondHours.mondayDate){
      this.requestSecondHours.mondayApprove = event.detail.value;
      if(this.requestSecondHours.mondayApprove=="Y"){
        this.total.monday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.monday = this.requestSecondHours.monday;
        this.sumTotalSecondTable();
      }
    }
    if(date===this.requestSecondHours.tuesdayDate){
      this.requestSecondHours.tuesdayApprove = event.detail.value;
      if(this.requestSecondHours.tuesdayApprove=="Y"){
        this.total.tuesday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.tuesday = this.requestSecondHours.tuesday;
        this.sumTotalSecondTable();
      }
    }
    if(date===this.requestSecondHours.wednesdayDate){
      this.requestSecondHours.wednesdayApprove = event.detail.value;
      if(this.requestSecondHours.wednesdayApprove=="Y"){
        this.total.wednesday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.wednesday = this.requestSecondHours.wednesday;
        this.sumTotalSecondTable();
      }
    }
    if(date===this.requestSecondHours.thursdayDate){
      this.requestSecondHours.thursdayApprove =  event.detail.value;
      if(this.requestSecondHours.thursdayApprove=="N"){
        this.total.thursday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.thursday = this.requestSecondHours.thursday;
        this.sumTotalSecondTable();
      }
    }
    if(date===this.requestSecondHours.fridayDate){
      this.requestSecondHours.fridayApprove = event.detail.value;
      if(this.requestSecondHours.fridayApprove=="N"){
        this.total.friday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.friday = this.requestSecondHours.friday;
        this.sumTotalSecondTable();
      }
      
    }
    if(date===this.requestSecondHours.saturdayDate){
      this.requestSecondHours.saturdayApprove = event.detail.value;
      if(this.requestSecondHours.saturdayApprove=="N"){
        this.total.saturday = 0;
        this.sumTotalSecondTable();
      }
      else{
        this.total.saturday = this.requestSecondHours.saturday;
        this.sumTotalSecondTable();
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

  sumTotalFirstTable(){
    this.sumFirstTable = this.sumarHours(
      this.total_1.monday, 
      this.total_1.tuesday, 
      this.total_1.wednesday, 
      this.total_1.thursday, 
      this.total_1.friday,
      this.total_1.saturday,
      this.total_1.sunday);
      this.sumTotalHours();
  }


  sumTotalSecondTable(){
    this.sumSecondTable = this.sumarHours(
        this.total.monday, 
        this.total.tuesday, 
        this.total.wednesday, 
        this.total.thursday, 
        this.total.friday,
        this.total.saturday,
        this.total.sunday);
    this.sumTotalHours();
  }

  sumTotalHours(){
    this.sumTotal = this.sumSecondTable + this.sumFirstTable;
  }

  postApproveHoursService(){
    if(this.requestHours.sundayApprove === undefined || this.requestHours.mondayApprove === undefined ||
        this.requestHours.tuesdayApprove === undefined || this.requestHours.wednesdayApprove === undefined ||
        this.requestHours.thursdayApprove === undefined || this.requestHours.fridayApprove === undefined ||
        this.requestHours.saturdayApprove === undefined || this.requestSecondHours.sundayApprove === undefined ||
        this.requestSecondHours.mondayApprove === undefined || this.requestSecondHours.tuesdayApprove === undefined ||
        this.requestSecondHours.wednesdayApprove === undefined || this.requestSecondHours.thursdayApprove === undefined ||
        this.requestSecondHours.fridayApprove === undefined || this.requestSecondHours.saturdayApprove === undefined
      ){
        this.approvedAlertFaild();
    }else{
      this.request[0] = this.requestHours;
      this.request[1] = this.requestSecondHours;
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

  sumarHours(...valores:number[]) {
    let suma=0;
    for(let x=0;x<valores.length;x++)
      suma+=valores[x];
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
