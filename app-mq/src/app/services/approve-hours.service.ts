import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';;

@Injectable({
  providedIn: 'root'
})
export class ApproveHoursService {

  URL_GET_HOURS = HOST.concat("/mqservices/manager/list-timespant-approvation");
  URL_POST_APPROVE_HOURS = HOST.concat("/mqservices/manager/save-timesstamp");

  constructor() { }

  getTimeSpantApprovation(token:string, param:any){
    const options: HttpOptions = {
      url: this.URL_GET_HOURS,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
      params: {username: `${param}`} 
    }
    return from(Http.get(options));
  }

  postApproveHours(token:string, body:any, param:any){
    const options: HttpOptions = {
      url: this.URL_GET_HOURS,
      method: 'POST',
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`,
        'Content-Type': 'application/json'
      },
      data: body,
      params: {username: `${param}`} 
    }
    return from(Http.request(options));
  }


}


