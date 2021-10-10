import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { ClockOutDTO } from '../class/employee';
import { HOST, TOKEN_TYPE } from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class ClockOutService {

  URL: string = HOST.concat("/mqservices/employee/clock-out");

  constructor() { }

  clockOut(body:ClockOutDTO, token:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
      method: 'POST',
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`,
        'Content-Type': 'application/json'
      },
      data: body,
    }
    return from(Http.request(options));
  }
}
