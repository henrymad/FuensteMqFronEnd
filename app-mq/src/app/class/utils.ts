class Coordenadas{
  latiude:string;
  longitude:string;
}

export class DataBuilding {
  public id:number;
  public nameBuilding:string;
}

export class Employee {

  public id: number;
  public name:string;
  public role:string;
  public photo:string;
  public userName:string;
  public firstName:string;
  public lastName:string;
  public password:string;
  public position:string;
  public token:string;
  public hours: number;
  public weekHours:number;
  public weeklyTotalHours:number;
  public hoursWorked:number;
  public isMensageActive:boolean;
  public dateStart: Date; 
  public dateEnd: Date; 
  public positionStart: Coordenadas = new Coordenadas();
  public positionEnd: Coordenadas = new Coordenadas();
  public buildingId:number;
  public week:number;

  public upperCaseEmployee(nameEmploye:string): string{
    const firstUpperCase = nameEmploye.charAt(0).toUpperCase();
    const deleteFirstLetter = nameEmploye.slice(1);
    return firstUpperCase.concat(deleteFirstLetter);
  }

  public convertBase64ToJpg(base64:string):string{
    const jpg = 'data:image/jpeg;base64,';
    return jpg.concat(base64);
  }

}

export class Building {
  public id:number;
  public name:string;
  public listBuilding: Array<DataBuilding> = [];
  
}

export class ClockInDTO {
  public username: string;
  public buildingid:number;
  public dateStartShift: string;
  public latitudeStartShift:string;
  public longitudeStartShift:string;
  public dateEndShift:string;
  public longitudeEndShift:string;
  public latitudeEndShift:string;
}

export class ClockOutDTO{
  public username: string;
  public buildingid:number;
  public dateStartShift: string;
  public latitudeStartShift:string;
  public longitudeStartShift:string;
  public dateEndShift:string;
  public longitudeEndShift:string;
  public latitudeEndShift:string;
  public timestampId:number;
}

export class ResponseEvent {
  public timestampId:number;
  public nameBuilding:string;
  public status:boolean;
  public responseDTO:ClockInDTO = new ClockInDTO();
}

export class DetailWeek {
    parameterId: number;
    monday: number;
    mondayDate: string;
    mondayApprove:any 
    tuesday: number;
    tuesdayDate: string;
    tuesdayApprove: any;
    wednesday: number;
    wednesdayDate: string;
    wednesdayApprove: any;
    thursday: number;
    thursdayDate: string;
    thursdayApprove: any;
    friday: number;
    fridayDate: string;
    fridayApprove: any;
    saturday: number;
    saturdayDate: string;
    saturdayApprove: any;
    sunday: number;
    sundayDate: any;
    sundayApprove: any;
    listTimestampId: Array<any>;
    startWeekDate: any;
    endWeekDate: any;
}

export class ResponseClocOut{
  public state:boolean;
  public data:number;
}