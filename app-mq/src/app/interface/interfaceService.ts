export interface ResponseLogin {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  usuario?: string,
  rol?: string;
  jti?: string;
}

export interface PostionUsuario {
  userId: number,
  buildingd: number,
  dateStartShift: Date,
  latitudeStartShift: string,
  longitudeStartShift: string,
  dateEndShift: string,
  longitudeEndShift: string,
  latitudeEndShift: string
}

export interface Building {
  list: Array<data>;
}

interface data {
  buildingId?: number,
  nameBuilding?: string
}

export interface RootObject {
  headers: Headers;
  body: Body[];
  statusCode: string;
  statusCodeValue: number;
}

export interface Body {
  parameterId: number;
  monday: number;
  mondayDate: string;
  mondayApprove?: any;
  tuesday: number;
  tuesdayDate: string;
  tuesdayApprove?: any;
  wednesday: number;
  wednesdayDate: string;
  wednesdayApprove?: any;
  thursday: number;
  thursdayDate: string;
  thursdayApprove?: any;
  friday: number;
  fridayDate: string;
  fridayApprove?: any;
  saturday: number;
  saturdayDate: string;
  saturdayApprove?: any;
  sunday: number;
  sundayDate: string;
  sundayApprove?: any;
  listTimestampId: number[];
  startWeekDate: string;
  endWeekDate: string;
}

export interface Week {
  day:string;
  hours: number;
  date: string;
  approve?: any;
  dayTotal?:number;
}
